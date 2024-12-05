import http.server
import ssl

# Ustawienia katalogu roboczego i portu
server_address = ('127.0.0.1', 8000)

# Tworzenie serwera HTTP
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)

# Konfiguracja SSL
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(certfile="localhost.pem", keyfile="localhost-key.pem")

# Owijanie gniazda serwera w SSL
httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

# Uruchomienie serwera
print("Serwer HTTPS działa na https://127.0.0.1:8000")
httpd.serve_forever()
