/**
 * Strukturalangan ma'lumot (schema.org) uchun <script type="application/ld+json">.
 * "<" belgisi qochiriladi: tashqi matn (masalan, blog sarlavhasi) skriptni yopib qo'ya olmaydi.
 */
const JsonLd = ({ data }: { data: object | object[] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
  />
);

export default JsonLd;
