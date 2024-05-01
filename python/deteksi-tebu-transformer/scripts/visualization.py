import random
from PIL import Image
import matplotlib.pyplot as plt

random.seed(7)

def cek_gambar(path):

    data_path_list = list(path.glob('*/*/*.jpeg'))
    rand_image = random.choice(data_path_list)
    image_class = rand_image.parent.stem
    img = Image.open(rand_image)

    print(f'Direktori gambar: {rand_image}')
    print(f'Class gambar: {image_class}')
    print(f'Tinggi gambar: {img.height}')
    print(f'Lebar gambar: {img.width}')
    plt.imshow(img)
    plt.axis('off')
    plt.show()

def cek_gambar_dl(image_batch, label_batch, class_names):

    rand_image = random.randrange(len(image_batch))
    image, image_class = image_batch[rand_image], label_batch[rand_image]

    print(f'Shape gambar: {image.shape}')
    print(f'Class gambar bentuk tensor: {image_class}')

    plt.imshow(image.permute(1, 2 ,0))
    plt.title(class_names[image_class])
    plt.axis(False);