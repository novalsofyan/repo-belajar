
import cv2

from ultralytics import YOLO

# Muat model
model = YOLO('python/project/deteksi-tebu/runs/detect/train2/weights/best.pt')

# Prediksi gambar
img = 'python/project/deteksi-tebu/datasets/daun_tebu/healthy/healthy (222).jpeg'
results = model(img, show = True, conf = 0.48, imgsz = (640, 480))
cv2.waitKey(0)
cv2.destroyAllWindows()