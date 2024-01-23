import torch
import ultralytics
import matplotlib.pyplot as plt
import numpy as np
import cv2

from ultralytics import YOLO

# Muat model
model = YOLO('python/project/deteksi-tebu/best_deteksi_tebu.pt')

# Prediksi dengan membuka kamera

# Open the video file
kamera = cv2.VideoCapture(1)

# Looping untuk kamera
while kamera.isOpened():
    # Membaca frame dari kamera
    berhasil, frame = kamera.read()

    if berhasil:
        # Membuat fram YOLOv8
        hasil = model(frame, conf = 0.3)

        # Menampilkan hasil prediksi pada frame
        annotated_frame = hasil[0].plot()

        # Tampilkan pada kamera
        cv2.imshow('Prediksi Daun Tebu', annotated_frame)

        # Exit kamera menggunakan tombol 'x'
        if cv2.waitKey(1) & 0xFF == ord('x'):
            break
    else:
        break

# Lepaskan windows kamera
kamera.release()
cv2.destroyAllWindows()