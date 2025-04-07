import torch
import cv2
import pathlib
import sys

# Solución para evitar problemas con PosixPath en Windows
if sys.platform == 'win32':
    pathlib.PosixPath = pathlib.WindowsPath

# Cargar el modelo YOLOv5
model = torch.hub.load('ultralytics/yolov5', 'custom', path='C:/Users/mauro/Downloads/best.pt', force_reload=True)

# Configurar la cámara
cap = cv2.VideoCapture(1)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)  # Reducir resolución para mejorar rendimiento
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Procesar el cuadro con el modelo
    results = model(frame)

    # Filtrar detecciones con confianza >= 80%
    detections = results.pandas().xyxy[0]  # Obtener resultados como DataFrame
    high_conf_detections = detections[detections['confidence'] >= 0.8]


    # Mostrar resultados
    if not high_conf_detections.empty:
        print("ACEITE DETECTADA")  # Imprimir detecciones con alta confianza

    # Renderizar y mostrar el cuadro con las detecciones
    rendered_frame = results.render()[0]  # Renderizar el cuadro original con las detecciones
    cv2.imshow("YOLOv5 Detection", rendered_frame)

    # Salir si se presiona la tecla 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Liberar recursos
cap.release()
cv2.destroyAllWindows()