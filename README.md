# Cursor + Pointer
## *SVG Names*
<pre>
cursor-initial-white.svg

hourglass-auth-full.svg

cursor-auth-default.svg
cursor-auth-text.svg
cursor-auth-click-.svg
cursor-auth-sonar.svg
cursor-auth-hourglass.svg
cursor-auth-light.svg

cursor-auth-expand-horizontal.svg
cursor-auth-expand-vertical.svg
cursor-auth-resize-horizontal.svg
cursor-auth-resize-vertical.svg
cursor-auth-plus.svg
cursor-auth-minus.svg
cursor-auth-zoom-in.svg
cursor-auth-zoom-out.svg

pointer-auth-finger.svg
pointer-auth-click.svg
pointer-auth-open-hand.svg

pointer-auth-plus.svg
pointer-auth-minus.svg
pointer-auth-hold-horizontal.svg
pointer-auth-hold-vertical.svg
pointer-auth-swipe-right.svg
pointer-auth-swipe-left.svg
</pre>

## *Cursor Layer Id's*
<pre>
icrate-cursor-initial-white

icrate-hourglass-full

icrate-cursor-default
icrate-cursor-text
icrate-cursor-click
icrate-cursor-sonar
icrate-cursor-hourglass
icrate-cursor-light

icrate-cursor-expand-horizontal
icrate-cursor-expand-vertical
icrate-cursor-resize-horizontal
icrate-cursor-resize-vertical
icrate-cursor-plus
icrate-cursor-minus
icrate-cursor-zoom-in
icrate-cursor-zoom-out

icrate-pointer-finger
icrate-pointer-click
icrate-pointer-open-hand

icrate-pointer-plus
icrate-pointer-minus
icrate-pointer-hold-horizontal
icrate-pointer-hold-vertical
icrate-pointer-swipe-right
icrate-pointer-swipe-left
</pre>

## *Cursor SVG Entities*
### **Groups**
`add '-group' to the layer id and use in html as id for a 'g' element`

Example CSS:
```css
g#icrate-cursor-default-group {fill:#aaaaaa;}
```

### **Inner painting**
`add '-inner' to the layer id and use in html as class for a 'polygon' element`

Example CSS:
```css
polygon.icrate-cursor-default-inner {fill:#aaaaaa;}
```

## **Outline painting**
`add '-outline' to the layer id and use in html as class for a 'path' element`

Example CSS:
```css
path.icrate-cursor-default-inner {fill:#aaaaaa;}
```

## **Indicator painting**
`add '-indicator', '-indicator-group' or '-indicator-XX' to the layer id and use in html as class for a 'path' element`

Example CSS:
```css
path.icrate-cursor-click-indicator {fill:#aaaaaa;}
path.icrate-cursor-click-indicator-group {fill:#bbbbbb;}
path.icrate-cursor-click-indicator-01 {fill:#cccccc;}
```

## **Sign painting**
`add '-sign' to the layer id and use in html as class for a 'path' element`

Example CSS:
```css
path.icrate-cursor-minus-sign {fill:#aaaaaa;}
```