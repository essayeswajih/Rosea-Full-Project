import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

AdminEmail = os.getenv('SENDER_EMAIL')

def send_email(to_email, subject, body):
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    from_email = os.getenv("FROM_EMAIL")

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)  # ✅ Use SMTP login here
        server.sendmail(from_email, to_email, msg.as_string())