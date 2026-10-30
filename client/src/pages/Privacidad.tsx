// Página Política de privacidad — ruta /privacidad, enlazada desde Contacto y el footer
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

const LAST_UPDATE = "27 de octubre de 2026";

const sections: { title: string; paragraphs: string[] }[] = [
  {
    title: "1. Responsable y alcance",
    paragraphs: [
      "Grupo Empresarial CAP es responsable de los datos personales recopilados a través del sitio capgrupo.com y del portal de reclutamiento CAP Recruit (recruit.capgrupo.com/aplicar), al que el sitio enlaza. Grupo CAP actúa como Centro de Servicios Compartidos de Inversiones S&M, Distribuidora Mansiago, Auto Repuestos Blessing y Tecnicentro DIDASA.",
      "Razón social: Grupo Empresarial CAP. País: Honduras. Domicilio: Bulevar Comunidad Económica Europea, frente a Plaza Aire Frío, Tegucigalpa, Honduras.",
      "Responsable de la información de privacidad: Sharon Gisselle González, Jefa de Talento Humano y Legal. Correo: s.merci@cap.hn.",
      "Esta política aplica a los candidatos que envían su currículum desde el enlace «Trabaje con nosotros», a quienes envían una solicitud de información desde el sitio y a cualquier persona que nos escriba o use el sitio.",
      "Al usar el sitio o enviar una postulación o solicitud, usted declara haber leído esta política.",
    ],
  },
  {
    title: "2. Datos personales que recopilamos",
    paragraphs: [
      "Datos de postulación: nombre completo, datos de contacto, dirección, vacante a la que aplica, experiencia, aspiración salarial, herramientas que domina y los demás datos que incluya en el formulario de CAP Recruit.",
      "Currículum vitae: archivo PDF con su formación, experiencia laboral, referencias y cualquier otro dato que usted incluya.",
      "Candidatos de portales de empleo: además de quienes postulan directamente en CAP Recruit (recruit.capgrupo.com), importamos candidatos que se postularon a vacantes en Tecoloco, Computrabajo y CCIT. Esos portales nos transfieren los datos de postulación y el currículum para su evaluación.",
      "Solicitudes de información: tipo de consulta (cliente o taller, flota corporativa, institución pública, proveedor o marca, alianza o inversión), empresa de interés, el detalle que usted escriba y el correo o WhatsApp con el que nos responda.",
      "Registro de aceptación: fecha y hora en que acepta el aviso de privacidad y la versión del aviso aceptada.",
      "Datos técnicos: dirección IP, navegador y sistema operativo, generados automáticamente al visitar el sitio.",
      "Comunicaciones: mensajes que nos envíe por formularios, correo o WhatsApp.",
      "No solicitamos datos sensibles (salud, religión, afiliación política, origen étnico o datos biométricos). Si los incluye voluntariamente en su currículum o en una solicitud, no se usarán como criterio de selección ni para atenderla y se eliminarán junto con su expediente.",
    ],
  },
  {
    title: "3. Finalidades",
    paragraphs: [
      "Recibir y evaluar postulaciones frente a las vacantes publicadas, contactar a los candidatos y, si corresponde, iniciar un proceso de contratación.",
      "Responder solicitudes de información y canalizarlas a la empresa del grupo que usted elija.",
      "Considerar a un candidato para vacantes futuras, mientras su expediente se conserve conforme a la sección 10.",
      "Registrar su aceptación del aviso de privacidad, como evidencia de su consentimiento.",
      "Mantener la seguridad del sitio y cumplir obligaciones legales, contables o laborales.",
      "Generar estadísticas agregadas y anónimas. No usamos sus datos con fines de publicidad ni los vendemos a terceros.",
    ],
  },
  {
    title: "4. Base legal y marco normativo",
    paragraphs: [
      "Tratamos sus datos con base en su consentimiento al enviar un formulario, en el interés legítimo de proteger nuestros sistemas y en el cumplimiento de obligaciones legales en Honduras.",
      "Honduras aún no cuenta con una ley general de protección de datos personales. Esta política se rige por la Constitución de la República, que reconoce el derecho a la intimidad y la garantía de Hábeas Data; por la Ley de Transparencia y Acceso a la Información Pública (Decreto 170-2006), en lo relativo a la confidencialidad; por la Ley sobre Justicia Constitucional (Decreto 244-2003), y por los principios de licitud, finalidad, proporcionalidad, calidad, seguridad y confidencialidad.",
      "Si se aprueba una ley específica, adecuaremos esta política en el plazo que esa ley establezca.",
      "Referencias oficiales: Constitución de la República, Ley de Transparencia y Acceso a la Información Pública, Decreto 170-2006, Ley sobre Justicia Constitucional, Decreto 244-2003 y Decreto 10-2013, reforma del hábeas data.",
    ],
  },
  {
    title: "5. Evaluación de postulaciones con herramientas automatizadas",
    paragraphs: [
      "Para ordenar y revisar las postulaciones usamos herramientas de apoyo, incluida inteligencia artificial, que comparan el currículum con los requisitos de la vacante y generan un puntaje de referencia.",
      "Ninguna decisión de contratación se toma solo con esa herramienta: una persona del área de Talento Humano revisa cada postulación.",
      "Si quiere que su postulación sea revisada solo de forma manual, o que se le explique el resultado, escriba a s.merci@cap.hn.",
    ],
  },
  {
    title: "6. Cookies y almacenamiento en su navegador",
    paragraphs: [
      "El sitio público no usa cookies publicitarias ni de seguimiento de terceros. El navegador guarda en su equipo, solo para la experiencia de navegación, si ya vio la presentación inicial y qué empresa o filtro tenía seleccionado en el explorador. Estos datos no se envían a nuestros servidores y se borran al cerrar la pestaña.",
      "Puede borrar o bloquear las cookies desde la configuración de su navegador.",
    ],
  },
  {
    title: "7. Servicios de terceros",
    paragraphs: [
      "Google Fonts: para cargar las tipografías del sitio, su navegador se conecta a servidores de Google, que pueden registrar su dirección IP.",
      "Google Maps: los botones «Cómo llegar» abren Google Maps en una pestaña nueva, sujeto a la política de Google.",
      "WhatsApp: al usar los botones de WhatsApp o enviar una solicitud, la conversación se realiza en WhatsApp, operado por Meta, y se rige por su política de privacidad. Los mensajes llegan a la empresa del grupo que usted elija.",
      "Correo, redes sociales y LinkedIn: estos enlaces abren aplicaciones o sitios externos con sus propias políticas de privacidad.",
      "Enlaces externos: no somos responsables de las prácticas de privacidad de sitios de terceros a los que se enlace desde este sitio.",
    ],
  },
  {
    title: "8. Con quién compartimos los datos",
    paragraphs: [
      "No vendemos ni cedemos datos personales a terceros con fines comerciales. Los datos solo se comparten en estos casos: con las empresas del grupo, para evaluar candidatos a las vacantes de cada una o atender la solicitud que usted eligió; con el área de Talento Humano y las jefaturas que entrevistan, solo para las vacantes a su cargo; con los proveedores tecnológicos que operan el portal (alojamiento, correo y respaldo), bajo contrato con cláusulas de confidencialidad; con autoridades hondureñas, solo ante requerimiento judicial o administrativo válido; y con asesores legales o auditores, bajo obligación de confidencialidad.",
      "Algunos proveedores pueden alojar datos fuera de Honduras. En esos casos exigimos medidas de seguridad equivalentes a las descritas en la sección 9.",
    ],
  },
  {
    title: "9. Seguridad de la información",
    paragraphs: [
      "Aplicamos medidas técnicas y organizativas razonables para proteger los datos contra acceso no autorizado, pérdida o alteración: conexión cifrada (HTTPS) en todo el sitio, acceso restringido al personal autorizado y respaldos periódicos.",
      "Si ocurriera un incidente de seguridad que afecte sus datos, le informaremos en un plazo máximo de 72 horas desde que lo confirmemos, indicando el alcance y las medidas tomadas.",
    ],
  },
  {
    title: "10. Plazo de conservación",
    paragraphs: [
      "Postulaciones y currículums de candidatos no contratados: 6 meses desde la aplicación, para considerarlos en vacantes futuras. Después se eliminan, salvo que pida antes su cancelación.",
      "Candidatos contratados: su expediente pasa al archivo laboral y se conserva según la legislación laboral hondureña.",
      "Solicitudes de información: 12 meses después de resolverlas.",
      "Registro de aceptación del aviso: mientras se conserve la postulación o solicitud asociada.",
      "Registros técnicos: 24 meses, salvo que formen parte de una investigación o requerimiento legal.",
      "Vencido el plazo, los datos se eliminan de forma segura o se anonimizan.",
    ],
  },
  {
    title: "11. Sus derechos",
    paragraphs: [
      "Puede solicitar acceso, rectificación, cancelación y oposición sobre sus datos (derechos ARCO), así como una copia en formato legible (portabilidad). Puede además revocar en cualquier momento la autorización que nos dio. Estos derechos se fundamentan en la garantía constitucional de Hábeas Data.",
      "Para ejercerlos, escriba a s.merci@cap.hn indicando el derecho que ejerce, los datos a los que se refiere y el correo con el que se postuló o nos escribió. Responderemos en un plazo máximo de 10 días hábiles; si la solicitud es compleja, el plazo podrá ampliarse 10 días más, y se lo comunicaremos.",
      "Si no recibe respuesta o no está conforme, puede acudir a la acción de Hábeas Data ante los tribunales hondureños competentes.",
    ],
  },
  {
    title: "12. Menores de edad",
    paragraphs: [
      "Nuestros servicios no están dirigidos a menores de 18 años. La edad mínima para postularse es de 18 años.",
    ],
  },
  {
    title: "13. Cambios y contacto",
    paragraphs: [
      "Podemos actualizar esta política cuando cambien los servicios, los proveedores o la legislación aplicable. La versión vigente estará siempre publicada en esta página, con su fecha de última actualización.",
      "Para consultas, solicitudes o reclamos relacionados con esta política, escriba al correo de privacidad s.merci@cap.hn.",
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
              Esta política explica qué datos personales recopilamos a través de capgrupo.com y del portal de reclutamiento CAP Recruit, para qué los usamos, con quién los compartimos y cómo puede ejercer sus derechos.
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
