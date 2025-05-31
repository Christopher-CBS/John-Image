export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  console.log("API /api/send-reservation appelée");
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Formatage de la date en français
    const dateRdv = data.selectedDate
      ? new Date(data.selectedDate).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    // Traduction de la durée si besoin
    let duree = data.eventDuration;
    if (duree === "full-day") duree = "Journée complète";

    const mailOptions = {
      from: `${data.firstName} ${data.lastName} <${data.email}>`,
      replyTo: data.email,
      to: "widewebagency@gmail.com",
      subject: "Nouvelle réservation reçue",
      text: `Nouvelle réservation\n\nNom : ${data.firstName} ${
        data.lastName
      }\nEmail : ${data.email}\nTéléphone : ${
        data.phone
      }\nDate du rendez-vous : ${dateRdv}\nType d'événement : ${
        data.eventType === "autre" ? data.otherEventType : data.eventType
      }\nDétails : ${data.eventDate} (${duree}), ${
        data.numberOfGuests
      } personnes, ${data.eventLocation}, ${data.eventPostalCode} ${
        data.eventCity
      }\nServices : ${(data.selectedServices || []).join(", ")}\nLivraison : ${(
        data.deliveryFormats || []
      ).join(", ")}\nRéférent : ${data.referentName} (${
        data.referentPhone
      })\nConsentement : ${
        data.consentImageRights ? "Oui" : "Non"
      }\nQuestions complémentaires : ${data.additionalQuestions || "Aucune"}`,
      html: `
        <div style="background:#f8f7f4;padding:40px 0;">
          <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:18px;box-shadow:0 4px 24px #0001;padding:32px 32px 24px 32px;font-family:'Segoe UI',Arial,sans-serif;">
            <div style="text-align:center;margin-bottom:24px;">
              <span style="font-size:2rem;font-weight:700;letter-spacing:2px;color:#222;">Nouvelle réservation ✨</span>
            </div>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
            <div style="font-size:1.1rem;line-height:1.7;color:#222;">
              <p><b>👤 Nom :</b> ${data.firstName} ${data.lastName}</p>
              <p><b>✉️ Email :</b> <a href="mailto:${
                data.email
              }" style="color:#6c63ff;text-decoration:none;">${
        data.email
      }</a></p>
              <p><b>📞 Téléphone :</b> ${data.phone}</p>
              <p><b>📅 Date du rendez-vous :</b> ${dateRdv}</p>
              <p><b>🎉 Type d'événement :</b> ${
                data.eventType === "autre"
                  ? data.otherEventType
                  : data.eventType
              }</p>
              <p><b>📝 Détails :</b> ${data.eventDate} (${duree}), ${
        data.numberOfGuests
      } personnes, ${data.eventLocation}, ${data.eventPostalCode} ${
        data.eventCity
      }</p>
              <p><b>🛠️ Services :</b> ${(data.selectedServices || []).join(
                ", "
              )}</p>
              <p><b>📦 Livraison :</b> ${(data.deliveryFormats || []).join(
                ", "
              )}</p>
              <p><b>👥 Référent :</b> ${data.referentName} (${
        data.referentPhone
      })</p>
              <p><b>🔒 Consentement :</b> ${
                data.consentImageRights ? "Oui" : "Non"
              }</p>
              <p><b>❓ Questions complémentaires :</b> ${
                data.additionalQuestions || "Aucune"
              }</p>
            </div>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
            <div style="text-align:center;color:#aaa;font-size:0.95rem;">
              <p>Merci pour votre confiance.<br>Ce message est généré automatiquement par le site John.</p>
            </div>
          </div>
        </div>
      `,
    };

    // Envoi du mail à l'admin
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Nodemailer info:", info);

    // Envoi d'un accusé de réception au client
    const clientMailOptions = {
      from: `John Image <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Votre demande de réservation a bien été reçue !",
      text: `Bonjour ${
        data.firstName
      },\n\nMerci pour votre réservation, nous avons bien reçu votre demande et nous vous contacterons rapidement pour finaliser votre projet.\n\nRésumé de votre demande :\n- Date du rendez-vous : ${dateRdv}\n- Type d'événement : ${
        data.eventType === "autre" ? data.otherEventType : data.eventType
      }\n- Lieu : ${data.eventLocation}, ${data.eventPostalCode} ${
        data.eventCity
      }\n\nÀ très bientôt !\n\nL'équipe John Studio`,
      html: `
        <body style="background:#f4f5f7;padding:40px 0;margin:0;">
          <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:18px;box-shadow:0 4px 24px #0001;padding:32px 32px 24px 32px;font-family:'Segoe UI',Arial,sans-serif;">
            <div style="text-align:center;margin-bottom:24px;">
              <span style="font-size:2rem;font-weight:700;letter-spacing:2px;color:#222;">Merci pour votre réservation&nbsp;! 🎉</span>
            </div>
            <hr style="border:none;border-top:1px solid #ececec;margin:24px 0;">
            <div style="font-size:1.08rem;line-height:1.7;color:#222;text-align:center;">
              <p>Bonjour <b>${data.firstName}</b>,</p>
              <p>Nous avons bien reçu votre demande de réservation.<br>Nous vous contacterons rapidement pour finaliser votre projet.</p>
            </div>
            <div style="margin:32px 0 16px 0;">
              <div style="background:#f8f7f4;border-radius:12px;padding:18px 20px;">
                <div style="font-size:1.05rem;color:#222;margin-bottom:8px;"><b>Résumé de votre demande :</b></div>
                <div style="color:#444;line-height:1.7;">
                  <div><b>📅 Date du rendez-vous :</b> ${dateRdv}</div>
                  <div><b>🎉 Type d'événement :</b> ${
                    data.eventType === "autre"
                      ? data.otherEventType
                      : data.eventType
                  }</div>
                  <div><b>📍 Lieu :</b> ${data.eventLocation}, ${
        data.eventPostalCode
      } ${data.eventCity}</div>
                </div>
              </div>
            </div>
            <div style="text-align:center;color:#aaa;font-size:0.95rem;margin-top:24px;">
              <p>Merci pour votre confiance.<br>L'équipe John Studio</p>
            </div>
          </div>
        </body>
      `,
    };
    await transporter.sendMail(clientMailOptions);

    return NextResponse.json(
      { message: "Email envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    return NextResponse.json(
      { message: "Erreur lors de l'envoi", error },
      { status: 500 }
    );
  }
}
