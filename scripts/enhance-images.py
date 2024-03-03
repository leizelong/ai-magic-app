import os
from PIL import Image
import sys

# pip3 install Pillow

# 输入文件夹路径
input_folder = sys.argv[1]

# 输出文件夹路径
output_folder = sys.argv[2]

# 指定的分辨率
resolution = tuple(map(int, sys.argv[3].split('x')))

# 遍历输入文件夹中的所有图像文件
for filename in os.listdir(input_folder):
    input_file_path = os.path.join(input_folder, filename)
    output_file_path = os.path.join(output_folder, filename)

    # 打开图像文件
    img = Image.open(input_file_path)

    # 调整图像大小到指定分辨率 ANTIALIAS
    img = img.resize(resolution, Image.LANCZOS)

    # 保存高清化后的图像
    img.save(output_file_path)

print("图像高清化完成")
