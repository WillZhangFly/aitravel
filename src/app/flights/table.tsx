export function PredictionResultTable({ predictions, recommendation }) {
  if (!predictions || predictions.length === 0) return <div>No predictions</div>
  const firstResult = predictions[0]
  const colNames = Object.keys(firstResult);

  const priceColIdx = colNames.map(x => x.toLocaleLowerCase()).indexOf('price');
  const dateColIdx = colNames.map(x => x.toLocaleLowerCase()).indexOf('date');
  const requestIDColIdx = colNames.map(x => x.toLocaleLowerCase()).indexOf('requestid');


  return <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {colNames.map((colName, index) => {
            if (index === requestIDColIdx) {return null;}
            return <th key={`col-${index}`} scope="col" className="px-6 py-3">
              {colName}
            </th>
          }
          )}
        </tr>
      </thead>
      <tbody>
        {predictions.map((prediction, trIdx) => {
          const trValues = Object.values(prediction);
          let className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200";
          if(prediction.requestID === recommendation.requestID) {
            className = "bg-green-50 border-b dark:bg-green-900 dark:border-green-700 border-green-2000"
          }
          return <tr key={`prediction-${trIdx}`} className={className}>
            {trValues.map((colValue, index) => {
              if (index === requestIDColIdx) {return null; }
              const isDate = index === dateColIdx;
              const isPrice = index === priceColIdx;
              const renderedDate = isDate ? new Date(Date.parse(colValue as string)).toLocaleDateString() : null;
              const renderedPrice = isPrice ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(colValue as number) : null;
              const isOne = colValue == 1;
              const yesValue = isOne ? 'Yes' : null;
              const isZero = colValue == 0;
              const noValue = isZero ? 'No' : null;
              const renderedCol = renderedDate ? renderedDate : renderedPrice ? renderedPrice : yesValue ? yesValue : noValue ? noValue : colValue;
              return <td key={`${trIdx}-${index}`} className="px-6 py-4">
                {renderedCol as string}
              </td>
            }
            )}
          </tr>
        }
        )}
      </tbody>
    </table>
  </div>

}