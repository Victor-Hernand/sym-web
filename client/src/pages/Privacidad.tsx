// Página Política de privacidad — ruta /privacidad, enlazada desde Contacto y el footer
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

const LAST_UPDATE = "30 de octubre de 2026";

const sections: { title: string; paragraphs: string[] }[] = [
  {
    title: "1. Responsable y alcance",
    paragraphs: [
      "Inversiones Castro S de R L, que opera comercialmente como Inversiones S&M, es responsable de los datos personales recopilados a través del sitio inversionessymhn.com, incluidas las páginas Nosotros y Contacto.",
      "Razón social: Inversiones Castro S de R L. Nombre comercial: Inversiones S&M. RTN: 08019019103201. País: Honduras. Domicilio: Boulevard Comunidad Económica Europea, frente a Plaza Aire Frío, Tegucigalpa, Honduras.",
      "Responsable de la información de privacidad: ventas@sym.com, teléfono +504 9210-9620.",
      "Esta política aplica a quienes envían una solicitud de cotización mayorista desde el sitio, a quienes nos escriben por WhatsApp o correo, y a cualquier persona que use el sitio.",
      "Las postulaciones de empleo se realizan en el portal de reclutamiento CAP Recruit (recruit.capgrupo.com), operado por Grupo Empresarial CAP. Ese portal se rige por su propia política de privacidad y no por esta.",
      "Al usar el sitio o enviar una solicitud, usted declara haber leído esta política.",
    ],
  },
  {
    title: "2. Datos personales que recopilamos",
    paragraphs: [
      "Solicitud de cotización mayorista: nombre, empresa, tipo de cliente, teléfono, correo electrónico (opcional) y el mensaje que escriba sobre los productos que necesita.",
      "Comunicaciones: los mensajes que nos envíe por WhatsApp o por correo electrónico.",
      "Datos técnicos: dirección IP, navegador y sistema operativo, que pueden generarse de forma automática en los servidores que alojan el sitio al visitarlo.",
      "No solicitamos datos sensibles (salud, religión, afiliación política, origen étnico o datos biométricos). Si los incluye voluntariamente en un mensaje, no se usarán para atender su solicitud y se eliminarán.",
    ],
  },
  {
    title: "3. Cómo se procesa su solicitud",
    paragraphs: [
      "El formulario de cotización no guarda sus datos en los servidores del sitio. Al enviarlo, se abre WhatsApp con su mensaje pre-cargado y la conversación se realiza con nuestro equipo comercial a través de WhatsApp, operado por Meta.",
      "Sus datos solo se usan para atender su solicitud, contactarlo y, si corresponde, preparar una cotización o agendar una visita comercial.",
    ],
  },
  {
    title: "4. Finalidades",
    paragraphs: [
      "Atender solicitudes de cotización mayorista, responder consultas y contactarlo por WhatsApp, teléfono o correo electrónico.",
      "Cumplir obligaciones legales, contables y tributarias.",
      "Mantener la seguridad del sitio y generar estadísticas agregadas y anónimas.",
      "No usamos sus datos con fines de publicidad masiva ni los vendemos a terceros.",
    ],
  },
  {
    title: "5. Base legal y marco normativo",
    paragraphs: [
      "Tratamos sus datos con base en su consentimiento: al enviar el formulario usted acepta esta política mediante la casilla correspondiente. También con base en el interés legítimo de proteger nuestros sistemas y en el cumplimiento de obligaciones legales en Honduras.",
      "Honduras aún no cuenta con una ley general de protección de datos personales. Esta política se rige por la Constitución de la República, que reconoce el derecho a la intimidad y la garantía de Hábeas Data; por la Ley de Transparencia y Acceso a la Información Pública (Decreto 170-2006), en lo relativo a la confidencialidad; por la Ley sobre Justicia Constitucional (Decreto 244-2003), y por los principios de licitud, finalidad, proporcionalidad, calidad, seguridad y confidencialidad.",
      "Si se aprueba una ley específica, adecuaremos esta política en el plazo que esa ley establezca.",
      "Referencias oficiales: Constitución de la República, Ley de Transparencia y Acceso a la Información Pública, Decreto 170-2006, Ley sobre Justicia Constitucional, Decreto 244-2003 y Decreto 10-2013, reforma del hábeas data.",
    ],
  },
  {
    title: "6. Cookies, almacenamiento y analítica",
    paragraphs: [
      "El sitio no usa cookies publicitarias ni de seguimiento de terceros. El navegador guarda en su equipo, solo para la experiencia de navegación, su preferencia de tema (claro u oscuro). Estos datos no se envían a nuestros servidores.",
      "El sitio puede usar Umami, una herramienta de analítica que mide visitas de forma agregada y sin cookies. Sus datos no se usan para perfilarlo ni para publicidad.",
      "Puede borrar o bloquear las cookies y el almacenamiento local desde la configuración de su navegador.",
    ],
  },
  {
    title: "7. Servicios de terceros",
    paragraphs: [
      "Google Fonts: para cargar las tipografías del sitio, su navegador se conecta a servidores de Google, que pueden registrar su dirección IP.",
      "WhatsApp: los botones de WhatsApp y el envío de solicitudes abren conversaciones en WhatsApp, operado por Meta, que se rige por su propia política de privacidad.",
      "Correo, redes sociales y LinkedIn: Facebook, Instagram, TikTok, LinkedIn y los enlaces de correo abren sitios o aplicaciones externas con sus propias políticas de privacidad.",
      "CAP Recruit: el enlace de postulación de empleo abre el portal de Grupo Empresarial CAP, con su propia política de privacidad.",
      "Enlaces externos: no somos responsables de las prácticas de privacidad de sitios de terceros a los que se enlace desde este sitio.",
    ],
  },
  {
    title: "8. Con quién compartimos los datos",
    paragraphs: [
      "No vendemos ni cedemos datos personales a terceros con fines comerciales. Los datos solo se comparten en estos casos: con el equipo comercial de Inversiones S&M, para atender la solicitud que usted envía; con Grupo Empresarial CAP, que presta servicios compartidos a Inversiones S&M, bajo confidencialidad; con los proveedores tecnológicos que alojan el sitio y gestionan el correo, bajo contrato con cláusulas de confidencialidad; con autoridades hondureñas, solo ante requerimiento judicial o administrativo válido; y con asesores legales o auditores, bajo obligación de confidencialidad.",
      "Algunos proveedores pueden alojar datos fuera de Honduras. En esos casos exigimos medidas de seguridad equivalentes a las descritas en la sección 9.",
    ],
  },
  {
    title: "9. Seguridad de la información",
    paragraphs: [
      "Aplicamos medidas técnicas y organizativas razonables para proteger los datos contra acceso no autorizado, pérdida o alteración, incluido el acceso restringido al personal autorizado.",
      "Si ocurriera un incidente de seguridad que afecte sus datos, le informaremos en un plazo máximo de 72 horas desde que lo confirmemos, indicando el alcance y las medidas tomadas.",
    ],
  },
  {
    title: "10. Plazo de conservación",
    paragraphs: [
      "El sitio no almacena las solicitudes de cotización. La información que recibimos por WhatsApp o correo se conserva durante el tiempo necesario para atender su solicitud y cumplir obligaciones legales y contables.",
      "Datos técnicos de los servidores de alojamiento: según la política de conservación del proveedor de hosting.",
      "Vencido el plazo, los datos se eliminan de forma segura o se anonimizan.",
    ],
  },
  {
    title: "11. Sus derechos",
    paragraphs: [
      "Puede solicitar acceso, rectificación, cancelación y oposición sobre sus datos (derechos ARCO), así como una copia en formato legible (portabilidad). Puede además revocar en cualquier momento la autorización que nos dio. Estos derechos se fundamentan en la garantía constitucional de Hábeas Data.",
      "Para ejercerlos, escriba a ventas@sym.com indicando el derecho que ejerce, los datos a los que se refiere y el medio de contacto con el que nos escribió. Responderemos en un plazo máximo de 10 días hábiles; si la solicitud es compleja, el plazo podrá ampliarse 10 días más, y se lo comunicaremos.",
      "Si no recibe respuesta o no está conforme, puede acudir a la acción de Hábeas Data ante los tribunales hondureños competentes.",
    ],
  },
  {
    title: "12. Menores de edad",
    paragraphs: [
      "Nuestros servicios están dirigidos a clientes mayoristas y no a menores de 18 años.",
    ],
  },
  {
    title: "13. Cambios y contacto",
    paragraphs: [
      "Podemos actualizar esta política cuando cambien los servicios, los proveedores o la legislación aplicable. La versión vigente estará siempre publicada en esta página, con su fecha de última actualización.",
      "Para consultas, solicitudes o reclamos relacionados con esta política, escriba a ventas@sym.com o llame al +504 9210-9620.",
    ],
  },
];

export default function Privacidad() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-light-bg">
        <Navbar />
        <main className="flex-1 py-12 md:py-16 bg-[#f8fafc]">
          <div className="container max-w-3xl">
            <span className="section-label">Legal</span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-[#1B3A6B] mt-4 mb-4">
              Política de <span className="text-gradient-red">privacidad</span>
            </h1>
            <p className="text-[#1B3A6B]/45 text-sm mb-10">Última actualización: {LAST_UPDATE}</p>
            <p className="text-[#1B3A6B]/70 leading-relaxed mb-10">
              Esta política explica qué datos personales recopilamos a través de inversionessymhn.com, para qué los usamos, con quién los compartimos y cómo puede ejercer sus derechos.
            </p>

            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-display font-bold text-lg text-[#1B3A6B] uppercase tracking-wider mb-3">{section.title}</h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-[#1B3A6B]/70 text-sm leading-relaxed">{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </div>
    </MotionConfig>
  );
}
