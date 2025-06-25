import imgIlustration from '/images/image-man-eating.webp';

export default function Explanation() {
  return (
    <section className='py-5 d-md-flex align-items-center' id='container-1'>
      <div className='container-image text-center col-xl-5 offset-xl-1'>
        <img src={imgIlustration} alt="man_eating" />
      </div>
      <div className="container">
        <div className="text-result col-xl-7 offset-1">
          <h2 className='subTitle mb-4'>What your BMI result means</h2>
          <p>
            A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a
            healthy weight may lower your chances of experiencing health issues...
          </p>
        </div>
      </div>
    </section>
  );
}
