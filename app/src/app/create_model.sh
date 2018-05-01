r_singular="demo"
r_plural="demos"
echo Ingrese el nombre EN PLURAL del modulo a crear:
read new_plural
echo Ingrese el nombre EN SINGULAR del modulo a crear:
read new_singular
echo Se creará el modulo $new_plural...
cp -r pages/"$r_plural" pages/"$new_plural"
cd pages/"$new_plural"
find . -name $r_plural'*' -exec bash -c 'mv $0 ${0/'$r_plural'/'$new_plural'}' {} \;
echo La pagina '$new_plural' fue creada correctamente.
echo Creando el Model...
cd ../..
cp -r @core/data/models/"$r_plural" @core/data/models/"$new_plural"
cd @core/data/models/"$new_plural"
find . -name $r_plural'*' -exec bash -c 'mv $0 ${0/'$r_plural'/'$new_plural'}' {} \;
echo El modelo $new_plural fue creado correctamente.
echo Reemplazandos variables en Models...
find . -type f -exec sed -i '' -e 's/'$(tr '[:lower:]' '[:upper:]' <<< ${r_plural:0:1})${r_plural:1}'/'$(tr '[:lower:]' '[:upper:]' <<< ${new_plural:0:1})${new_plural:1}'/g' {} \;
find . -type f -exec sed -i '' -e 's/'$(tr '[:lower:]' '[:upper:]' <<< ${r_singular:0:1})${r_singular:1}'/'$(tr '[:lower:]' '[:upper:]' <<< ${new_singular:0:1})${new_singular:1}'/g' {} \;
find . -type f -exec sed -i '' -e 's/'$r_plural'/'$new_plural'/g' {} \;
find . -type f -exec sed -i '' -e 's/'$r_singular'/'$new_singular'/g' {} \;
cd ../../../../pages/"$new_plural"
echo Reemplazandos variables en Pages...
find . -type f -exec sed -i '' -e 's/'$(tr '[:lower:]' '[:upper:]' <<< ${r_plural:0:1})${r_plural:1}'/'$(tr '[:lower:]' '[:upper:]' <<< ${new_plural:0:1})${new_plural:1}'/g' {} \;
find . -type f -exec sed -i '' -e 's/'$(tr '[:lower:]' '[:upper:]' <<< ${r_singular:0:1})${r_singular:1}'/'$(tr '[:lower:]' '[:upper:]' <<< ${new_singular:0:1})${new_singular:1}'/g' {} \;
find . -type f -exec sed -i '' -e 's/'$r_plural'/'$new_plural'/g' {} \;
find . -type f -exec sed -i '' -e 's/'$r_singular'/'$new_singular'/g' {} \;
echo Fin de la tarea.