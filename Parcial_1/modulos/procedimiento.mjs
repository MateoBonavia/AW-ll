import { obtenerFranquicias } from './franquicias.mjs';

export { calcularFranquiciaMasValiosa };

/* Determina la franquicia de mayor valor. */
async function calcularFranquiciaMasValiosa() {
  const franquicias = await obtenerFranquicias();

  const masValiosa = franquicias.reduce((mayor, franquicia) =>
    franquicia.valor > mayor.valor ? franquicia : mayor
  );

  return {
    proceso: 'Franquicia más valiosa',
    resultado: masValiosa,
  };
}
