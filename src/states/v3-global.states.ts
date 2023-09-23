import { Step } from "pages/v3/step.enum";
import { atom, useRecoilState, useRecoilValue } from "recoil";

const stepAtom = atom<Step>({
  key: "atom/step",
  default: Step.Risk,
});

interface Selections {
  [Step.Risk]: number | null;
  [Step.Investment]: string | null;
  [Step.PriceRange]: string | null; // "0-1000"
  [Step.Input]: number | null;
  [Step.Done]: number | null;
}

const selectionsAtom = atom<Selections>({
  key: "atom/selections",
  default: {
    [Step.Risk]: null,
    [Step.Investment]: null,
    [Step.PriceRange]: null,
    [Step.Input]: null,
    [Step.Done]: null,
  },
});

export const useV3Step = () => {
  const [step, setStep] = useRecoilState(stepAtom);
  const selections = useRecoilValue(selectionsAtom);
  let canNext = false;
  switch (step) {
    case Step.Risk:
      canNext = selections[Step.Risk] !== null && selections[Step.Risk] > -1;
      break;
    case Step.Investment:
    case Step.PriceRange:
      canNext = selections[Step.Investment] !== null;
      break;

    case Step.Input:
      canNext = true;
      break;
    case Step.Done:
      canNext = true;
      break;
  }

  return [step, setStep, canNext] as const;
};

export const useV3Selection = (step: Step) => {
  const [selection, setSelection] = useRecoilState(selectionsAtom);
  return [
    selection[step],
    (value: (typeof selection)[Step]) => {
      setSelection((selections) => ({
        ...selections,
        [step]: value,
      }));
    },
  ] as const;
};
