# react-particle-count
OpenCv // ReactJS

Resumen del codigo:

1-Definimos una función llamada "onLoad".
2-Llamamos a la función "setCnv" y le pasamos "true" como parámetro.
3-Creamos dos objetos, uno es un vector de matriz llamado "contours" y otro es una matriz llamada "hierarchy".
4-Leemos una imagen usando la función "cv.imread" y la asignamos a la variable "mat".
5-Convertimos la imagen en escala de grises usando la función "cv.cvtColor".
6-Aplicamos un umbral a la imagen usando la función "cv.threshold".
7-Encontramos los contornos de la imagen utilizando la función "cv.findContours".
8-Convertimos la imagen nuevamente a RGB utilizando la función "cv.cvtColor".
9-Iteramos a través de todos los contornos encontrados usando un ciclo "for".
10-Dibujamos los contornos en la imagen utilizando la función "cv.drawContours".
11-Imprimimos el número de contornos encontrados en la consola utilizando la función "console.log".
12-Llamamos a la función "setSize" y le pasamos el número de contornos como parámetro.
13-Mostramos la imagen en un elemento de lienzo utilizando la función "cv.imshow".
14-Liberamos la memoria asignada a la variable "mat" utilizando la función "mat.delete()".
