import logo from "../assets/img/TheCutestLogo.png";

export const Logo = ({ text }) => {
  return (
    <div className="auth-form-logo-container">
      <div style={{ textAlign: 'center', marginBottom: '1vh' }}>
        <img src={logo} alt="Escudo" width='70%' height='50%' />
      </div>
      <div style={{ textAlign: 'center' }}>
        <span>{text}</span>
      </div>
    </div>
  )
}



