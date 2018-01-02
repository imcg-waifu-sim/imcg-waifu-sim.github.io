import json
import urllib
import urllib2
import requests
from io import BytesIO

from bs4 import BeautifulSoup

savePath = '../../distribution/imcg-waifu-sim-quotes/shimamura_uzuki/101/001/home/quote.txt'
savePathEv = '../../distribution/imcg-waifu-sim-quotes/shimamura_uzuki/101/002/home/quote.txt'



downloadPath = '../../distribution/imcg-waifu-sim-quotes/shimamura_uzuki/101/001/home/audio/'
downloadPathEv = '../../distribution/imcg-waifu-sim-quotes/shimamura_uzuki/101/002/home/audio/'



urlRead = 'https://starlight.kirara.ca/card/100001'
r = urllib.urlopen(urlRead).read()
soup = BeautifulSoup(r,"lxml")
body = soup.find('body')
table = soup.find('table', id="va_card_100001")


quoteFile = open(savePath, 'w')

splitCounter = 0
stageNum = 0
enteredFirst = False
occ_count = -1

for row in table.findAll('tr'):
	
	td = row.findAll('td')

	print '-----------'

	if splitCounter >= 3 and enteredFirst:
		enteredFirst = False
		stageNum = stageNum + 1
		occ_count = -1

		# Switch to new file
		quoteFile.close()

		if stageNum < 2:
			quoteFile = open(savePathEv, 'w')

			#print('Entering Stage: ' + str(stageNum))

	notTarget = False

	correctSound = False


	for col in td:
		spanAr = col.findAll('span')

		spanCounter = 0

		for span in spanAr:
			# We have finally entered the columns containing the sound tracks
			# Now we have to filter for the right clips
			if span.text[0:12] == 'USE_TYPE__T_':

				if int(span.text[12]) != 1:
					# This means this isn't the home screen
					#print('XXX['+span.text+']XXX')
					splitCounter = splitCounter + 1
					notTarget = True
					correctSound = False
					break
				else:
					# This is the home screen
					#print('['+span.text+']')
					splitCounter = 0
					notTarget = False
					enteredFirst = True
					correctSound = True
		
			elif spanCounter <= 1 and not notTarget:
				# It probably is the Japanese quote
				print(span.text)

				quoteStr = span.text.encode('utf8') + '\n'
				quoteFile.write(quoteStr)
				splitCounter = 0
				occ_count = occ_count + 1
				#print('')
				break

			spanCounter = spanCounter + 1

		aAR = col.findAll('a')

		for a in aAR:
			if correctSound:
				print a['href']
		
				if stageNum < 1:
					dlPath = downloadPath + str(occ_count) + '.mp3'
				else:
					dlPath = downloadPathEv + str(occ_count)+ '.mp3'
				urllib.urlretrieve(a['href'],dlPath)		

				correctSound = False


	#print(td[0].findAll('span'))
	#print ''
#print(row)
