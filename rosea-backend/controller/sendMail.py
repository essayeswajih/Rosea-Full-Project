import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

AdminEmail = os.getenv('SENDER_EMAIL')

def send_email(to_email, subject, body):
    # Environment variables
    smtp_user = os.getenv("SENDER_EMAIL")
    smtp_pass = os.getenv("SENDER_PASSWORD")
    smtp_server = os.getenv("SENDER_SERVER", "smtp-relay.brevo.com")
    smtp_port = int(os.getenv("SENDER_PORT", 587))
    from_email = os.getenv("FROM_EMAIL")
    #debug
    print(f"Email sent to {to_email}")
    print(f"From: {from_email}")
    print(f"Subject: {subject}")
    print(f"Body: {body}")
    print(f"SMTP Server: {smtp_server}")
    print(f"SMTP Port: {smtp_port}")
    print(f"SMTP User: {smtp_user}")
    print(f"SMTP Pass: {smtp_pass}")

    # Prepare message
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Connect and send
    try:
        server = smtplib.SMTP(smtp_server, smtp_port, timeout=10)  # <-- ensure connection
        server.ehlo()               # Identify to server
        server.starttls()           # Upgrade to TLS
        server.ehlo()               # Re-identify after TLS
        server.login(smtp_user, smtp_pass)
        server.sendmail(from_email, to_email, msg.as_string())
        server.quit()
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise