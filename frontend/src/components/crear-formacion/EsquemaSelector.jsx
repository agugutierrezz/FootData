import './EsquemaSelector.css';

const EsquemaSelector = ({ esquema, setEsquema }) => {
  const esquemas = ["4-3-3", "4-4-2", "3-5-2", "4-2-3-1", "5-3-2", "4-1-4-1"];
  return (
    <><h3>Seleccionar Formación</h3>
    <select
      className="esquema-selector"
      value={esquema}
      onChange={(e) => setEsquema(e.target.value)}
    >
      {esquemas.map((op) => (
        <option key={op} value={op}>{op}</option>
      ))}
    </select></>
  );
};

export default EsquemaSelector;

