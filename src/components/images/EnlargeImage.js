const EnlargeImage = ({ src, alt, ariaLabel }) => {
  const label = ariaLabel || alt;

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <a href={src} target="_blank">
        <img src={src} alt={label} style={{ maxWidth: '100%', cursor: 'pointer' }} />
      </a>
    </div>
  );
};

export default EnlargeImage;
