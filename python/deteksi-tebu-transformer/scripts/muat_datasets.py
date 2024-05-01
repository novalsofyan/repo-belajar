import torch
import os

from pathlib import Path
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

def muat_data(path):
    image_path = path

    if image_path.is_dir():
        print('Path dataset sudah benar!')
        train_dir = image_path / 'train'
        test_dir = image_path / 'test'
        return train_dir, test_dir
    
    else:
        print('Path dataset salah!')

def dataLoader(train_dir, test_dir, batch_size, num_workers, train_transform, test_transform):

    train_data = datasets.ImageFolder(root = train_dir, transform = train_transform)
    test_data = datasets.ImageFolder(root = test_dir, transform = test_transform)

    BATCH_SIZE = batch_size
    NUM_WORKERS = num_workers
    print(f'Membuat DataLoader dengan ukuran batch {BATCH_SIZE} dan {NUM_WORKERS} workers.')

    trainDataloader = DataLoader(train_data,
                                batch_size = BATCH_SIZE,
                                shuffle = True,
                                num_workers = NUM_WORKERS)

    testDataloader = DataLoader(test_data,
                                batch_size = BATCH_SIZE,
                                shuffle = False,
                                num_workers = NUM_WORKERS)
    
    class_names = train_data.classes

    return trainDataloader, testDataloader, class_names