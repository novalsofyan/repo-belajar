import torch
import ultralytics
import matplotlib.pyplot as plt
import numpy as np
import cv2

from ultralytics import YOLO

# Muat model
model = YOLO('python/project/deteksi-tebu/best_deteksi_tebu.pt')

# Prediksi gambar
img = 'python/project/deteksi-tebu/datasets/test/mosaic (206).jpeg'
results = model(img, show = True, conf = 0.5, imgsz = (640, 480))
cv2.waitKey(0)
cv2.destroyAllWindows()