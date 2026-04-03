import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Privacidad: React.FC = () => {
  return (
    <div className="min-h-screen bg-offwhite font-sans">
      {/* Simple Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-richblack hover:text-powerred transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-bold">Volver al inicio</span>
          </a>
          <div className="font-serif text-xl font-bold text-richblack">
            La<span className="text-powerred">Carta</span>.space
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <h1 className="font-serif text-4xl md:text-5xl text-richblack mb-4">
            Política de Privacidad
          </h1>
          <p className="text-gray-500 text-sm mb-8">Última actualización: 30 de marzo de 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">1. Introducción</h2>
              <p className="leading-relaxed">
                En LaCarta.space ("nosotros", "nuestro" o "el Servicio"), respetamos su privacidad y
                nos comprometemos a proteger los datos personales que nos proporciona. Esta Política
                de Privacidad explica qué información recopilamos, cómo la usamos, y sus derechos
                respecto a esa información.
              </p>
              <p className="leading-relaxed">
                LaCarta.space es una plataforma SaaS para restaurantes que permite crear y compartir
                cartas digitales. NO somos un sistema de pedidos ni delivery. Nuestro servicio se
                enfoca en la visualización y exploración de menús digitales.
              </p>
              <p className="leading-relaxed">
                Esta política se aplica a todos los usuarios del Servicio, tanto restaurantes que
                crean cartas como visitantes que las consultan.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                2. Información que Recopilamos
              </h2>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">
                2.1 Información de Restaurantes (Clientes)
              </h3>
              <p className="leading-relaxed">
                Cuando un restaurante se registra en nuestro servicio, recopilamos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Datos de contacto:</strong> nombre, correo electrónico, teléfono, nombre
                  del restaurante
                </li>
                <li>
                  <strong>Datos de cuenta:</strong> contraseña encriptada, preferencias de usuario
                </li>
                <li>
                  <strong>Datos comerciales:</strong> dirección del restaurante, RUC/documento
                  tributario (si aplica)
                </li>
                <li>
                  <strong>Datos de facturación:</strong> información de pago procesada por terceros
                  seguros
                </li>
                <li>
                  <strong>Contenido del menú:</strong> nombres de platos, descripciones, precios,
                  imágenes, categorías
                </li>
              </ul>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">
                2.2 Información de Visitantes (Clientes Finales)
              </h3>
              <p className="leading-relaxed">
                Cuando un visitante accede a una carta digital mediante QR, recopilamos información
                técnica limitada:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Datos técnicos:</strong> dirección IP, tipo de navegador, dispositivo,
                  sistema operativo
                </li>
                <li>
                  <strong>Datos de uso:</strong> páginas visitadas, tiempo de navegación,
                  interacciones con el menú
                </li>
                <li>
                  <strong>Cookies:</strong> identificadores para mejorar la experiencia (ver sección
                  de cookies)
                </li>
              </ul>
              <p className="leading-relaxed mt-2">
                <strong>Importante:</strong> NO recopilamos información personal identificable de
                los visitantes (no pedimos nombres, correos, teléfonos ni datos de pago). Los
                visitantes pueden explorar los menús de forma anónima.
              </p>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">
                2.3 Información Recopilada Automáticamente
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Registros del servidor (logs) para mantenimiento y seguridad</li>
                <li>Métricas de rendimiento y disponibilidad del servicio</li>
                <li>Información de errores y diagnóstico técnico</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                3. Cómo Utilizamos su Información
              </h2>
              <p className="leading-relaxed">Utilizamos los datos recopilados para:</p>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">
                3.1 Proveer el Servicio
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Crear y alojar las cartas digitales de los restaurantes</li>
                <li>Procesar y mostrar el contenido (menús, imágenes, precios)</li>
                <li>Generar códigos QR únicos para cada restaurante</li>
                <li>Permitir actualizaciones en tiempo real del contenido</li>
                <li>Proporcionar herramientas de gestión y personalización</li>
              </ul>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">
                3.2 Mejorar y Optimizar
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analizar patrones de uso para mejorar funcionalidades</li>
                <li>Identificar y corregir errores técnicos</li>
                <li>Optimizar el rendimiento y velocidad de carga</li>
                <li>Desarrollar nuevas características basadas en uso real</li>
              </ul>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">3.3 Comunicación</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Enviar notificaciones importantes sobre el servicio</li>
                <li>Responder a consultas y brindar soporte técnico</li>
                <li>Informar sobre actualizaciones, nuevas funciones y mejoras</li>
                <li>Enviar recordatorios de facturación y pagos</li>
              </ul>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">
                3.4 Seguridad y Cumplimiento
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Detectar y prevenir fraudes o usos indebidos</li>
                <li>Proteger la seguridad de nuestros sistemas</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
              </ul>

              <p className="leading-relaxed mt-4">
                <strong>NO utilizamos sus datos para:</strong> publicidad dirigida de terceros,
                venta de bases de datos, perfilamiento invasivo ni fines ajenos al servicio
                principal.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                4. Compartir Información con Terceros
              </h2>
              <p className="leading-relaxed">
                Somos muy cuidadosos con su información. Solo la compartimos en las siguientes
                circunstancias:
              </p>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">
                4.1 Proveedores de Servicios
              </h3>
              <p className="leading-relaxed">
                Trabajamos con proveedores confiables que nos ayudan a operar el servicio:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Hosting:</strong> servidores en la nube que alojan la plataforma
                </li>
                <li>
                  <strong>Almacenamiento:</strong> servicios de almacenamiento de imágenes y
                  contenido
                </li>
                <li>
                  <strong>Procesamiento de pagos:</strong> pasarelas de pago seguras (no almacenamos
                  datos de tarjetas)
                </li>
                <li>
                  <strong>Email:</strong> servicios de correo transaccional para notificaciones
                </li>
                <li>
                  <strong>Análisis:</strong> herramientas de métricas y monitoreo (datos agregados y
                  anonimizados)
                </li>
              </ul>
              <p className="leading-relaxed mt-2">
                Todos estos proveedores están contractualmente obligados a proteger su información y
                solo pueden usarla para proveer servicios específicos.
              </p>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">4.2 Cumplimiento Legal</h3>
              <p className="leading-relaxed">
                Podemos divulgar información si es requerido por ley, orden judicial o autoridad
                gubernamental competente.
              </p>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">
                4.3 Transferencias Empresariales
              </h3>
              <p className="leading-relaxed">
                En caso de fusión, adquisición o venta de activos, su información podría
                transferirse como parte de la transacción. Le notificaríamos de cualquier cambio de
                este tipo.
              </p>

              <p className="leading-relaxed mt-4 font-bold">
                🔒 NO vendemos, alquilamos ni compartimos su información personal con terceros para
                sus propios fines de marketing.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                5. Cookies y Tecnologías Similares
              </h2>
              <p className="leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar su experiencia. Una cookie
                es un pequeño archivo de texto que se almacena en su dispositivo.
              </p>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">
                5.1 Tipos de Cookies que Usamos
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cookies esenciales:</strong> necesarias para el funcionamiento básico
                  (sesión de usuario, preferencias)
                </li>
                <li>
                  <strong>Cookies de rendimiento:</strong> nos ayudan a entender cómo se usa el
                  servicio (análisis agregado)
                </li>
                <li>
                  <strong>Cookies de funcionalidad:</strong> recuerdan sus preferencias (idioma,
                  tema visual)
                </li>
              </ul>

              <h3 className="font-bold text-lg text-richblack mt-4 mb-2">5.2 Control de Cookies</h3>
              <p className="leading-relaxed">
                La mayoría de los navegadores permiten controlar cookies en sus configuraciones.
                Puede bloquear o eliminar cookies, aunque esto puede afectar la funcionalidad del
                servicio.
              </p>
              <p className="leading-relaxed">
                No utilizamos cookies de publicidad de terceros ni trackers invasivos.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">6. Seguridad de los Datos</h2>
              <p className="leading-relaxed">
                Tomamos la seguridad muy en serio e implementamos medidas técnicas y organizativas
                apropiadas:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Encriptación:</strong> conexiones HTTPS/TLS para todas las comunicaciones
                </li>
                <li>
                  <strong>Contraseñas:</strong> almacenadas con hash y salt seguros (bcrypt)
                </li>
                <li>
                  <strong>Acceso restringido:</strong> solo personal autorizado puede acceder a los
                  datos
                </li>
                <li>
                  <strong>Monitoreo:</strong> supervisión continua de actividades sospechosas
                </li>
                <li>
                  <strong>Backups:</strong> copias de seguridad regulares para prevenir pérdida de
                  datos
                </li>
                <li>
                  <strong>Actualizaciones:</strong> parches de seguridad y actualizaciones regulares
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                Sin embargo, ningún método de transmisión por Internet es 100% seguro. Aunque
                hacemos nuestro mejor esfuerzo, no podemos garantizar seguridad absoluta.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">7. Retención de Datos</h2>
              <p className="leading-relaxed">
                Retenemos su información personal solo mientras sea necesario para los fines
                descritos en esta política:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cuentas activas:</strong> mientras su suscripción esté activa
                </li>
                <li>
                  <strong>Tras cancelación:</strong> hasta 90 días para permitir reactivación
                </li>
                <li>
                  <strong>Datos de facturación:</strong> según requerimientos legales contables
                  (generalmente 5-7 años)
                </li>
                <li>
                  <strong>Logs técnicos:</strong> máximo 12 meses
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                Después de estos períodos, eliminamos o anonimizamos permanentemente los datos.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">8. Sus Derechos</h2>
              <p className="leading-relaxed">
                De acuerdo con la Ley de Protección de Datos Personales del Perú (Ley N° 29733),
                usted tiene los siguientes derechos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Acceso:</strong> solicitar una copia de sus datos personales
                </li>
                <li>
                  <strong>Rectificación:</strong> corregir datos inexactos o incompletos
                </li>
                <li>
                  <strong>Cancelación:</strong> solicitar la eliminación de sus datos
                </li>
                <li>
                  <strong>Oposición:</strong> oponerse al procesamiento de sus datos en ciertos
                  casos
                </li>
                <li>
                  <strong>Portabilidad:</strong> recibir sus datos en formato estructurado y legible
                </li>
                <li>
                  <strong>Revocación:</strong> retirar el consentimiento en cualquier momento
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                Para ejercer estos derechos, contáctenos en{' '}
                <strong>privacidad@lacarta.space</strong>. Responderemos a su solicitud en un plazo
                de 10 días hábiles.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                9. Datos de Menores de Edad
              </h2>
              <p className="leading-relaxed">
                Nuestro servicio está dirigido a restaurantes (empresas) y no recopilamos
                intencionalmente información de menores de 18 años. Si descubrimos que hemos
                recopilado datos de un menor sin consentimiento parental, los eliminaremos de
                inmediato.
              </p>
              <p className="leading-relaxed">
                Los visitantes de las cartas digitales (clientes finales) pueden ser menores, pero
                como no recopilamos información personal identificable de visitantes, esto no
                representa un problema de privacidad.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                10. Transferencias Internacionales
              </h2>
              <p className="leading-relaxed">
                Sus datos pueden ser procesados en servidores ubicados fuera de Perú (por ejemplo,
                servicios de hosting en la nube de AWS, Google Cloud, etc.). Nos aseguramos de que
                todos los proveedores cumplan con estándares de protección de datos equivalentes o
                superiores a los peruanos.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                11. Cambios a esta Política
              </h2>
              <p className="leading-relaxed">
                Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios
                en nuestras prácticas o por razones legales. Los cambios materiales serán
                notificados por correo electrónico o mediante un aviso destacado en el servicio con
                al menos 15 días de anticipación.
              </p>
              <p className="leading-relaxed">
                La fecha de "Última actualización" al inicio de esta política indica cuándo se
                realizó la última revisión.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                12. Autoridad de Protección de Datos
              </h2>
              <p className="leading-relaxed">
                Si tiene inquietudes sobre cómo manejamos sus datos personales, puede presentar una
                queja ante la Autoridad Nacional de Protección de Datos Personales de Perú:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <p className="font-bold">Autoridad Nacional de Protección de Datos Personales</p>
                <p>Ministerio de Justicia y Derechos Humanos</p>
                <p>Web: www.minjus.gob.pe</p>
                <p>Email: protecciondedatos@minjus.gob.pe</p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">13. Contacto</h2>
              <p className="leading-relaxed">
                Para preguntas, solicitudes o inquietudes sobre esta Política de Privacidad o el
                manejo de sus datos, puede contactarnos en:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <p className="font-bold">LaCarta Technology</p>
                <p>Email: privacidad@lacarta.space</p>
                <p>Email alternativo: soporte@lacarta.space</p>
                <p>Lima, Perú</p>
              </div>
              <p className="leading-relaxed mt-4">
                🔒 <strong>Compromiso:</strong> Su privacidad es nuestra prioridad. No compartimos,
                vendemos ni revelamos su información personal con terceros para fines ajenos al
                servicio.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 bg-richblack text-center">
        <p className="text-gray-500 text-xs">
          © 2026 LaCarta Technology. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Privacidad;
