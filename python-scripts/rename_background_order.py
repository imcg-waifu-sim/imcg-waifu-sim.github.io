from PIL import Image
import os
from time import time


starting_value = 286
root_path = '../images/temp/'
path_to_save = '../images/background/'


slash = '/'
root = os.listdir(root_path)

print 'Creating array'

t0 = time()

fileAr = []
# Iterating through the item directories to get all file directory
for files in root:
	fileAr.append(files)

print 'Sorting:'
fileAr.sort()

print 'Iterating through folders:'
# Iterating through the item directories to get dir
for files in fileAr:
	# To try to check if image
	try:
		img = Image.open(root_path + files)
	except IOError:
		continue

	width = img.size[0]
	height = img.size[1]

	
	img2 = img.resize((width, height), Image.ANTIALIAS)

	removeStr = root_path + files
	saveStr = path_to_save + 'background' + str(starting_value) + '.png'

	os.remove(removeStr)
	img2.save(saveStr,"PNG")
	
	starting_value = starting_value + 1

total_time = time() - t0
print 'Counted ', str(starting_value),' files'
print 'Resize time: ', total_time, 's'
