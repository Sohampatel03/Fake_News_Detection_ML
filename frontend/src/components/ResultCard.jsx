const ResultCard = ({ result }) => {

  const isHeadline = result.mode === "headline_analysis";

  const isFake = result.prediction === "Fake News";
  const isReal = result.prediction === "Real News";

  const fakeP = result.fake_probability * 100;
  const realP = result.real_probability * 100;

  const color = isFake ? "#ef4444" : "#22c55e";
  const label = isFake ? "FAKE NEWS" : "REAL NEWS";

  return (
    <div style={{padding:"2rem"}}>

      {/* Verdict */}
      <h2 style={{color}}>
        {label}
      </h2>

      {/* HEADLINE MODE */}
      {isHeadline && (
        <p>
          Headline classification based on linguistic patterns.
        </p>
      )}

      {/* ARTICLE MODE */}
      {!isHeadline && (
        <>
          <p>Real Probability: {realP.toFixed(1)}%</p>
          <p>Fake Probability: {fakeP.toFixed(1)}%</p>
        </>
      )}

    </div>
  );
};

export default ResultCard;