import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Terminos: React.FC = () => {
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
            Términos de Servicio
          </h1>
          <p className="text-gray-500 text-sm mb-8">Última actualización: 30 de marzo de 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                1. Aceptación de los Términos
              </h2>
              <p className="leading-relaxed">
                Al acceder y utilizar LaCarta.space ("el Servicio"), usted acepta estar sujeto a
                estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos
                términos, no debe utilizar el Servicio.
              </p>
              <p className="leading-relaxed">
                LaCarta.space es una plataforma de Software como Servicio (SaaS) que permite a
                restaurantes crear, gestionar y compartir cartas digitales accesibles mediante
                códigos QR. No somos un sistema de pedidos ni delivery. Nuestro enfoque es la
                visualización y exploración de menús digitales.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                2. Descripción del Servicio
              </h2>
              <p className="leading-relaxed">
                LaCarta.space proporciona a los restaurantes una herramienta para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Crear y personalizar cartas digitales con imágenes, descripciones y precios</li>
                <li>Actualizar en tiempo real el contenido de sus menús</li>
                <li>Generar códigos QR únicos para acceso instantáneo</li>
                <li>Ofrecer a sus clientes una experiencia moderna de visualización de menús</li>
                <li>Organizar sus productos por categorías, turnos y disponibilidad</li>
              </ul>
              <p className="leading-relaxed mt-3">
                El Servicio NO incluye funcionalidades de pedidos en línea, pagos, delivery ni
                gestión de reservas.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">3. Registro y Cuentas</h2>
              <p className="leading-relaxed">
                Para utilizar el Servicio, los restaurantes deben registrarse y crear una cuenta.
                Usted se compromete a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar información precisa, actual y completa durante el registro</li>
                <li>Mantener actualizada su información de cuenta</li>
                <li>
                  Mantener la seguridad de su contraseña y aceptar la responsabilidad de todas las
                  actividades bajo su cuenta
                </li>
                <li>Notificarnos inmediatamente de cualquier uso no autorizado de su cuenta</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">4. Contenido del Usuario</h2>
              <p className="leading-relaxed">
                Usted conserva todos los derechos sobre el contenido que carga en el Servicio
                (imágenes de platos, descripciones, nombres, precios, etc.). Al usar el Servicio,
                nos otorga una licencia limitada para almacenar, mostrar y distribuir su contenido
                únicamente con el propósito de prestar el Servicio.
              </p>
              <p className="leading-relaxed">
                Usted es responsable de asegurarse de que tiene los derechos necesarios sobre todo
                el contenido que carga, incluyendo fotografías, textos y marcas. No asumimos
                responsabilidad por infracciones de derechos de autor o propiedad intelectual
                relacionadas con el contenido del usuario.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">5. Uso Aceptable</h2>
              <p className="leading-relaxed">Usted se compromete a NO utilizar el Servicio para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Cargar contenido ilegal, ofensivo, difamatorio o que infrinja derechos de terceros
                </li>
                <li>Intentar acceder a cuentas o datos de otros usuarios</li>
                <li>Transmitir virus, malware o cualquier código malicioso</li>
                <li>
                  Realizar ingeniería inversa, modificar o intentar extraer el código fuente del
                  Servicio
                </li>
                <li>Utilizar el Servicio de manera que interfiera con su funcionamiento normal</li>
                <li>Revender o redistribuir el Servicio sin autorización</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">6. Precios y Pagos</h2>
              <p className="leading-relaxed">
                El acceso al Servicio está sujeto al plan de suscripción elegido. Los precios están
                expresados en la moneda local (Soles peruanos - PEN) y pueden estar sujetos a
                impuestos aplicables.
              </p>
              <p className="leading-relaxed">
                Nos reservamos el derecho de modificar nuestros precios en cualquier momento. Los
                cambios en los precios se comunicarán con al menos 30 días de anticipación. Si no
                está de acuerdo con el cambio de precio, puede cancelar su suscripción antes de que
                el nuevo precio entre en vigencia.
              </p>
              <p className="leading-relaxed">
                Las suscripciones se facturan de forma recurrente (mensual o anual según el plan).
                Los reembolsos se manejan caso por caso y según lo establecido en nuestra política
                de reembolsos.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                7. Cancelación y Terminación
              </h2>
              <p className="leading-relaxed">
                Usted puede cancelar su suscripción en cualquier momento desde su panel de control.
                La cancelación será efectiva al final del período de facturación actual.
              </p>
              <p className="leading-relaxed">
                Nos reservamos el derecho de suspender o terminar su acceso al Servicio si:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Viola estos Términos de Servicio</li>
                <li>Su cuenta presenta actividad fraudulenta</li>
                <li>No realiza los pagos correspondientes</li>
                <li>Utiliza el Servicio de manera que perjudica a otros usuarios o al sistema</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">8. Propiedad Intelectual</h2>
              <p className="leading-relaxed">
                LaCarta.space, su diseño, funcionalidades, código fuente y todos los elementos que
                no sean contenido del usuario son propiedad exclusiva de LaCarta Technology y están
                protegidos por las leyes de propiedad intelectual de Perú y tratados
                internacionales.
              </p>
              <p className="leading-relaxed">
                No se otorga ninguna licencia o derecho sobre nuestra propiedad intelectual excepto
                el derecho limitado de uso del Servicio según estos términos.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                9. Limitación de Responsabilidad
              </h2>
              <p className="leading-relaxed">
                El Servicio se proporciona "tal cual" y "según disponibilidad". No garantizamos que
                el Servicio será ininterrumpido, libre de errores o completamente seguro.
              </p>
              <p className="leading-relaxed">
                En la máxima medida permitida por la ley peruana, LaCarta Technology no será
                responsable por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pérdida de ingresos, clientes o datos</li>
                <li>Daños indirectos, incidentales o consecuentes</li>
                <li>
                  Interrupciones del servicio por mantenimiento, actualizaciones o causas de fuerza
                  mayor
                </li>
                <li>Acciones de terceros o contenido de usuarios</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Nuestra responsabilidad total no excederá el monto pagado por usted en los últimos
                12 meses.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">10. Indemnización</h2>
              <p className="leading-relaxed">
                Usted acepta indemnizar y mantener indemne a LaCarta Technology, sus directores,
                empleados y afiliados de cualquier reclamo, demanda, daño o gasto (incluyendo
                honorarios legales) que surja de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Su uso del Servicio</li>
                <li>El contenido que usted carga</li>
                <li>Su violación de estos Términos</li>
                <li>Su violación de derechos de terceros</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                11. Jurisdicción y Ley Aplicable
              </h2>
              <p className="leading-relaxed">
                Estos Términos se regirán e interpretarán de acuerdo con las leyes de la República
                del Perú, sin dar efecto a ningún principio de conflictos de leyes.
              </p>
              <p className="leading-relaxed">
                Cualquier disputa relacionada con estos Términos será resuelta exclusivamente en los
                tribunales competentes de Lima, Perú. Usted acepta someterse a la jurisdicción
                personal de dichos tribunales.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                12. Modificaciones a los Términos
              </h2>
              <p className="leading-relaxed">
                Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los
                cambios materiales serán notificados por correo electrónico o mediante un aviso en
                el Servicio con al menos 15 días de anticipación.
              </p>
              <p className="leading-relaxed">
                Su uso continuado del Servicio después de la entrada en vigor de los cambios
                constituye su aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">
                13. Disposiciones Generales
              </h2>
              <p className="leading-relaxed">
                Si alguna disposición de estos Términos se considera inválida o inaplicable, las
                demás disposiciones permanecerán en pleno vigor y efecto.
              </p>
              <p className="leading-relaxed">
                Estos Términos constituyen el acuerdo completo entre usted y LaCarta Technology
                respecto al uso del Servicio y reemplazan cualquier acuerdo previo.
              </p>
              <p className="leading-relaxed">
                Nuestra falta de ejercicio de cualquier derecho o disposición de estos Términos no
                constituirá una renuncia a dicho derecho o disposición.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-richblack mb-3">14. Contacto</h2>
              <p className="leading-relaxed">
                Para preguntas sobre estos Términos de Servicio, puede contactarnos en:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-3">
                <p className="font-bold">LaCarta Technology</p>
                <p>Email: legal@lacarta.space</p>
                <p>Lima, Perú</p>
              </div>
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

export default Terminos;
