# Bienvenidos a este trabajo practico del bootcamp FullStack de Java

En esta ocación se pide crear una Wallet Digital integrando todos los conocimientos adqueridos en el módulo 2 del curso, lo que quiere decir, el uso de HTML, CSS, JavaScript, ademas de los frameworks Bootstrap y JQuery. A continuacion y con ayuda de la IA explicaré lo que hace esta Wallet

# Alke Wallet Digital

Una aplicación web interactiva de billetera digital que permite a los usuarios gestionar su saldo, depositar dinero, enviar dinero a contactos y consultar el historial de transacciones.

---

## ¿Qué hace Alke Wallet?

Alke Wallet es una plataforma digital simplificada que simula una billetera electrónica con las siguientes funcionalidades:

- **Login**: Interfaz de inicio de sesión para acceder a la billetera
- **Panel Principal**: Visualizar el saldo actual y acceder a las operaciones disponibles
- **Depositar**: Agregar dinero a la billetera
- **Enviar Dinero**: Transferir fondos a contactos registrados
- **Gestión de Contactos**: Agregar, almacenar y seleccionar contactos para enviar dinero
- **Historial de Transacciones**: Consultar todas las operaciones realizadas

Todos los datos se guardan en **localStorage del navegador**, por lo que la información persiste entre sesiones.

---

## 📁 Estructura del Proyecto

```
TrabajoPracticoM2_WalletDigital/
├── index.html          # Página de inicio de sesión
├── menu.html           # Menú principal de la billetera
├── deposit.html        # Página para realizar depósitos
├── sendmoney.html      # Página para enviar dinero a contactos
├── transactions.html   # Página con historial de transacciones
├── script.js           # Lógica y funcionalidad de la aplicación
├── styles.css          # Estilos visuales de la aplicación
└── README.md           # Este archivo
```

---

## 🔗 Relación entre archivos HTML, CSS y JavaScript

### **HTML - Estructura de Páginas**

Cada archivo HTML define una página diferente de la aplicación:

| Archivo | Propósito |
|---------|-----------|
| **index.html** | Login inicial - Formulario para ingresar email y contraseña |
| **menu.html** | Panel de control - Muestra el saldo y opciones para depositar, enviar dinero y ver transacciones |
| **deposit.html** | Formulario para depositar dinero a la billetera |
| **sendmoney.html** | Interfaz para enviar dinero a contactos y agregar nuevos contactos |
| **transactions.html** | Tabla con el historial completo de todas las transacciones |

### **CSS - Diseño y Estilos**

[styles.css](styles.css) proporciona:

- **Diseño responsivo** con Bootstrap 5.3.2
- **Tema visual consistente**: Gradiente de colores verde a púrpura
- **Estilos personalizados** para:
  - Tarjetas redondeadas con sombras
  - Botones con colores según su función (azul para primario, amarillo para advertencia, etc.)
  - Tipografía y espaciado profesional
  - Interfaz adaptable a dispositivos móviles

Todos los HTML importan el mismo archivo CSS para mantener un diseño consistente:
```html
<link rel="stylesheet" href="styles.css">
```

### **JavaScript - Lógica e Interactividad**

[script.js](script.js) es el **corazón de la aplicación**. Utiliza **jQuery** para:

#### **Inicialización al cargar:**
- Crea un saldo inicial de $1500 si es la primera vez
- Inicializa arrays vacíos para movimientos y contactos
- Valida que los datos guardados sean válidos

#### **Gestión del Saldo:**
- `actualizarSaldo()` - Obtiene y muestra el saldo en pantalla desde localStorage

#### **Registro de Transacciones:**
- `registrarMovimiento()` - Agrega cada operación al historial

#### **Gestión de Contactos:**
- `cargarContactos()` - Llena el selector de contactos disponibles
- Permite agregar nuevos contactos con nombre, alias y banco

#### **Handlers de Formularios:**
- Depósito: Valida monto y suma al saldo
- Envío de dinero: Valida fondos suficientes y descuenta del saldo
- Agregar contacto: Guarda nuevos contactos en localStorage

#### **Almacenamiento:**
Usa **localStorage** para persistencia:
```javascript
localStorage.setItem("saldo", cantidad);
localStorage.setItem("movimientos", JSON.stringify([]));
localStorage.setItem("contactos", JSON.stringify([]));
```

---

## 🔄 Flujo de la Aplicación

```
1. index.html (Login)
        ↓
2. menu.html (Menú Principal) - Se carga el saldo desde script.js
        ↓
   ┌─────────────────────────────────────┐
   ↓              ↓              ↓        ↓
deposit.html  sendmoney.html  transactions.html  Volver a menu.html
   ↓              ↓              ↓        ↓
   script.js actualiza localStorage en cada operación
   
3. Todos los datos se guardan y recuperan de localStorage
4. Los movimientos se registran con timestamps
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura
- **CSS3** - Estilos (con Bootstrap 5.3.2)
- **JavaScript** - Lógica
- **jQuery 3.6.0** - Manipulación del DOM
- **Bootstrap 5.3.2** - Framework CSS responsivo
- **localStorage** - Almacenamiento local de datos

---

## 💡 Características Principales

✅ Sistema de login simple  
✅ Gestión de saldo en tiempo real  
✅ Depósitos ilimitados  
✅ Transferencias a contactos  
✅ Gestión de contactos (agregar, eliminar, filtrar)  
✅ Historial de transacciones completo  
✅ Datos persistentes en el navegador  
✅ Interfaz responsiva y amigable  
✅ Validaciones de montos y datos  

---

## 📝 Notas

- Los datos se almacenan en **localStorage**, por lo que se pierden si se borra el historial del navegador
- El login es simulado y no requiere validación real de credenciales
- El saldo inicial es de **$1500**
- Cada operación se registra con su fecha y hora
- Le pedi ayuda a la IA para crear principalmente el archivo de JavaScript, ya que tuve muchos errores al momento de hacer el código, tambien le pedi ayuda a elegir los colores del css y el uso de Bootstrap
- Escribí comentarios en el archivo JavaScript para cada función con la finalidad de entender que hace cada linea y asi poder repasar y aprender

---

¡Disfruta usando Alke Wallet! 
