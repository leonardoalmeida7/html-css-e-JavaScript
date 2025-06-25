import { useState, useEffect, useMemo } from 'react';

export default function BMICalculator() {
  const [itChecked, setItChecked] = useState('metric');

  const [centimeter, setCentimeter] = useState('');
  const [kilo, setKilo] = useState('');

  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);
  const [stone, setStone] = useState(0);
  const [pounds, setPounds] = useState(0);

  const [resultImperial, setResultImperial] = useState(0);

  const clickMetric = () => {
    if (itChecked === 'metric') return;
    setItChecked('metric');
    resetInputs();
  };

  const clickImperial = () => {
    if (itChecked === 'imperial') return;
    setItChecked('imperial');
    resetInputs();
  };

  function resetInputs() {
    setCentimeter('');
    setKilo('');
    setFeet(0);
    setInches(0);
    setStone(0);
    setPounds(0);
  }

  useEffect(() => {
    const height = (feet * 30.48) + (inches * 2.54); // ajuste: 30.48 em vez de 30.28
    const weight = (stone * 6.35) + (pounds * 0.4536);
    setCentimeter(height !== 0 ? height.toFixed(2) : '');
    setKilo(weight !== 0 ? weight.toFixed(2) : '');
    const res = weight / (height / 100) ** 2;
    setResultImperial(parseFloat(res.toFixed(2)));
  }, [feet, inches, stone, pounds]);

  const parsedCentimeter = parseFloat(centimeter);
  const parsedKilo = parseFloat(kilo);

  const calcMetricBMI = useMemo(() => {
    if (parsedCentimeter > 0 && parsedKilo > 0) {
      return parseFloat((parsedKilo / ((parsedCentimeter / 100) ** 2)).toFixed(2));
    }
    return 0;
  }, [parsedCentimeter, parsedKilo]);

  const result = calcMetricBMI > 0 ? calcMetricBMI : resultImperial;

  const category = useMemo(() => {
    return result >= 25 || result < 18.5 ? 'unhealthy' : 'healthy';
  }, [result]);

  const minIdealWeight = useMemo(() => (((parsedCentimeter / 100) ** 2) * 18.5).toFixed(2), [parsedCentimeter]);
  const maxIdealWeight = useMemo(() => (((parsedCentimeter / 100) ** 2) * 24.9).toFixed(2), [parsedCentimeter]);

  const verifyInputs = useMemo(() => {
    const metricValid = parsedCentimeter > 0 && parsedKilo > 0;
    const imperialValid = feet > 0 && inches > 0 && stone > 0 && pounds > 0;
    return metricValid || imperialValid;
  }, [parsedCentimeter, parsedKilo, feet, inches, stone, pounds]);

  return (
    <section className='get-infos mx-3 p-4'>
      <span className='text-details fw-bold text-center d-block text-md-start'>
        Enter your details below
      </span>

      <div className='d-flex justify-content-around my-2 my-md-4 justify-content-md-start'>
        <div className='measure d-flex'>
          <div className="radio" id={itChecked === 'metric' ? 'checked' : 'no-checked'} onClick={clickMetric} />
          <span className='mx-2'>Metric</span>
        </div>
        <div className='measure d-flex'>
          <div className="radio" id={itChecked === 'imperial' ? 'checked' : 'no-checked'} onClick={clickImperial} />
          <span className='mx-2'>Imperial</span>
        </div>
      </div>

      {itChecked === 'metric' && (
        <div className='d-md-flex'>
          <div>
            <span className='d-block mb-2'>Height</span>
            <div className='contain-datas my-3 my-md-0 '>
              <input
                type="number"
                name="height"
                placeholder='0'
                value={centimeter}
                onChange={(e) => setCentimeter(e.target.value)}
              />
              <span className='element'>cm</span>
            </div>
          </div>
          <div className='mx-xl-3'>
            <span className='d-block mb-2'>Weight</span>
            <div className='contain-datas ms-md-3'>
              <input
                type="number"
                name="weight"
                placeholder='0'
                value={kilo}
                onChange={(e) => setKilo(e.target.value)}
              />
              <span className='element'>kg</span>
            </div>
          </div>
        </div>
      )}

      {itChecked === 'imperial' && (
        <div>
          <div className='d-flex align-items-md-end align-items-center mb-2'>
            <div>
              <span className='d-block mb-2'>Height</span>
              <div className='contain-datas my-2 my-md-0'>
                <input type="number" placeholder='0' onChange={(e) => setFeet(parseFloat(e.target.value) || 0)} />
                <span className='element'>ft</span>
              </div>
            </div>
            <div className='mt-4 mt-md-0 mx-xl-3 ms-3 ms-md-0'>
              <div className='contain-datas ms-md-3'>
                <input type="number" placeholder='0' onChange={(e) => setInches(parseFloat(e.target.value) || 0)} />
                <span className='element'>in</span>
              </div>
            </div>
          </div>

          <div className='d-flex align-items-md-end align-items-center mb-2'>
            <div>
              <span className='d-block mb-2'>Weight</span>
              <div className='contain-datas my-2 my-md-0'>
                <input type="number" placeholder='0' onChange={(e) => setStone(parseFloat(e.target.value) || 0)} />
                <span className='element'>st</span>
              </div>
            </div>
            <div className='mt-4 mt-md-0 mx-xl-3 ms-3 ms-md-0'>
              <div className='contain-datas ms-md-3'>
                <input type="number" placeholder='0' onChange={(e) => setPounds(parseFloat(e.target.value) || 0)} />
                <span className='element'>lbs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='container-result mt-4'>
        {verifyInputs ? (
          <div className='d-xl-flex'>
            <div className='me-5'>
              <span className='fw-bold'>Your BMI is...</span>
              <br />
              <span className='score fw-bold'>{result}</span>
            </div>
            <div>
              <p>
                Your BMI suggests you're a{' '}
                <span className={category === 'healthy' ? '' : 'fw-bold'}>{category}</span> weight. Your ideal weight
                is between <strong>{minIdealWeight}kg - {maxIdealWeight}kg</strong>.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <span className='fw-bold fs-4'>Welcome!</span>
            <div>
              <p className='m-0'>
                Enter your height and weight and you'll see your BMI result here.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
