import { useState, useEffect } from "react";

export function useModelProperty(model, propertyName) {
  if (!model || typeof propertyName !== "string" || !(propertyName in model)) {
    throw new Error("Invalid model or propertyName");
  }

  const [value, setValue] = useState(() => model[propertyName]);

  useEffect(() => {
    function obs() {
      setValue(model[propertyName]);
    }
    model.addObserver(obs);

    setValue(model[propertyName]);

    return function () {
      model.removeObserver(obs);
    };
  }, [model, propertyName]); 

  return value;
}
