#!/usr/bin/env python3

import os,sys,codecs

name = sys.argv[1]
dirname = sys.path[0]
print('create components {} on {}'.format(name, dirname))
os.chdir(dirname)

os.system('cp -Rf Hello '+name)

os.chdir(name)

os.rename('Hello.jade', name+'.jade')
os.rename('Hello.js', name+'.js')
os.rename('Hello.scss', name+'.scss')


for i in os.listdir():
  if i.find(name)==-1 and i!='package.json':continue
  print('gen {} file'.format(i))
  c = codecs.open(i, 'r', 'utf8').read()
  c = c.replace('Hello', name)
  codecs.open(i, 'w', 'utf8').write(c)
