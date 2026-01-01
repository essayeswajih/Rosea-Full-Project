import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email(to_email, subject, body):
    smtp_user = os.getenv("SMTP_USER")      # Brevo login
    smtp_pass = os.getenv("SMTP_PASS")      # xsmtpsib-...
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT"))
    from_email = os.getenv("SENDER_EMAIL")  # contact@rosea.tn

    if not all([smtp_user, smtp_pass, smtp_server, from_email]):
        raise RuntimeError("SMTP configuration missing")

    msg = MIMEMultipart()
    msg["From"] = from_email
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port, timeout=15)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.sendmail(from_email, to_email, msg.as_string())
        server.quit()
        print(f"✅ Email sent to {to_email}")
    except Exception as e:
        print(f"❌ Email sending failed: {e}")
        raise
