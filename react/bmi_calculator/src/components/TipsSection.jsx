import iconEating from '/images/icon-eating.svg';
import iconExercise from '/images/icon-exercise.svg';
import iconSleep from '/images/icon-sleep.svg';

export default function TipsSection() {
  return (
    <section className='container-fluid py-5 d-xl-flex' id='container-2'>
      <div>
        <img src={iconEating} alt="icon_eating" />
        <h3>Healthy eating</h3>
        <p>Healthy eating promotes weight control, disease prevention...</p>
      </div>
      <div className='mx-xl-4'>
        <img src={iconExercise} alt="icon_exercise" />
        <h3>Regular exercise</h3>
        <p>Exercise improves fitness, aids weight control, elevates mood...</p>
      </div>
      <div>
        <img src={iconSleep} alt="icon_sleep" />
        <h3>Adequate sleep</h3>
        <p>Sleep enhances mental clarity, emotional stability...</p>
      </div>
    </section>
  );
}
