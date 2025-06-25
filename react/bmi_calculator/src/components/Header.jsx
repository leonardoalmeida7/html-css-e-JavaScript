import logo from '/images/logo.svg';

export default function Header() {
  return (
    <header className='text-center text-xl-start'>
      <div className="px-5">
        <img src={logo} alt="logo" className='logo mt-5' />
        <h1 className='title my-5'>
          Body Mass Index Calculator
        </h1>
        <p className='mb-5'>
          Better understand your weight in relation to your height using our body mass index (BMI) calculator. While BMI is not the sole determinant of a healthy weight, it offers a valuable starting point to evaluate your overall health and well-being.
        </p>
      </div>
    </header>
  );
}
