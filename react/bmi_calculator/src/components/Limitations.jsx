import iconGender from '/images/icon-gender.svg';
import iconAge from '/images/icon-age.svg';
import iconMuscle from '/images/icon-muscle.svg';
import iconPregnancy from '/images/icon-pregnancy.svg';
import iconRace from '/images/icon-race.svg';

export default function Limitations() {
  return (
    <section className='container row gap-3 mx-auto' id='container-3'>
      <div className='text-center text-xl-start col-12 col-lg-10 offset-lg-1 col-xl-5'>
        <h2>Limitations of BMI</h2>
        <p>
          Although BMI is often a practical indicator of healthy weight, it is not suited for
          every person. Specific groups should carefully consider their BMI outcomes, and in
          certain cases, the measurement may not be beneficial to use.
        </p>
      </div>

      <div className="boxs col-10 offset-1 col-md-5 offset-md-1 col-xl-4">
        <div className='d-flex mb-3'>
          <img className='me-3' src={iconGender} alt="icon_gender" />
          <h3>Gender</h3>
        </div>
        <p>
          The development and body fat composition of girls and boys vary with age. Consequently,
          a child's age and gender are considered when evaluating their BMI.
        </p>
      </div>

      <div className="boxs col-10 offset-1 col-md-5 offset-md-0 col-xl-4 ms-xl-auto">
        <div className='d-flex mb-3'>
          <img className='me-3' src={iconAge} alt="icon_age" />
          <h3>Age</h3>
        </div>
        <p>
          In aging individuals, increased body fat and muscle loss may cause BMI to underestimate
          body fat content.
        </p>
      </div>

      <div className="boxs col-10 offset-1 col-md-5 offset-md-1 col-xl-4 offset-xl-0">
        <div className='d-flex mb-3'>
          <img className='me-3' src={iconMuscle} alt="icon_muscle" />
          <h3>Muscle</h3>
        </div>
        <p>
          BMI may misclassify muscular individuals as overweight or obese, as it doesn't
          differentiate muscle from fat.
        </p>
      </div>

      <div className="boxs col-10 offset-1 col-md-5 offset-md-0 col-xl-4 offset-xl-2">
        <div className='d-flex mb-3'>
          <img className='me-3' src={iconPregnancy} alt="icon_pregnancy" />
          <h3>Pregnancy</h3>
        </div>
        <p>
          Expectant mothers experience weight gain due to their growing baby. Maintaining a
          healthy pre-pregnancy BMI is advisable to minimise health risks for both mother
          and child.
        </p>
      </div>

      <div className="boxs col-10 offset-1 col-md-6 offset-md-3 col-xl-4 offset-xl-0">
        <div className='d-flex mb-3'>
          <img className='me-3' src={iconRace} alt="icon_race" />
          <h3>Race</h3>
        </div>
        <p>
          Certain health concerns may affect individuals of some Black and Asian origins at
          lower BMIs than others. To learn more, it is advised to discuss this with your
          GP or practice nurse.
        </p>
      </div>
    </section>
  );
}
