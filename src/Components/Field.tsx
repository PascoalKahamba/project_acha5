import { useEffect, useState } from "react";
import { Form } from "../MyStyles";
import { DivError } from "../StylesHome";
import Button from "./Button";

type PropsSameValue = React.ChangeEventHandler<HTMLInputElement> | undefined;
interface Props {
  label: string;
  number?: number;
  value?: string;
  id?: string;
  title: string;
  active?: boolean;
  button?: boolean;
  setActive?: Function;
  resultEnd?: Function;
  setDiscoveries?: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setWrongWord: React.Dispatch<React.SetStateAction<boolean>>;
  setInputClass: React.Dispatch<React.SetStateAction<string>>;
  setRightWord: React.Dispatch<React.SetStateAction<string>>;
}

const Field = ({
  label,
  title,
  setActive,
  active,
  id,
  number,
  value,
  resultEnd,
  button,
  setDiscoveries,
  setError,
  setWrongWord,
  setInputClass,
  setRightWord,
}: Props) => {
  const [input, setInput] = useState("");
  const [InputError, setInputError] = useState(false);
  const [idDifferent, setIdDifferent] = useState("");

  useEffect(() => {
    if (title === title) setIdDifferent(`Jogador${number}`);
  }, [title]);

  const isSameValue = (player: string) => {
    input.split("").forEach((letter) => {
      if (player.includes(letter))
        if (setDiscoveries) setDiscoveries((discover) => discover + 1);
    });
    if (input === player) {
      console.log("Voce descubriu a palaavra secreta");
    }
  };
  const handleClick = () => {
    if (input.length < 5) {
      setInputError(true);
    } else {
      setRightWord("");
      setInputClass("");
      setError(false);
      setWrongWord(false);
      setInputError(false);
      if (setActive) setActive();

      setInput("");
      if (resultEnd) resultEnd(true, input, idDifferent, title, value);

      if (setDiscoveries) setDiscoveries(0);

      if (value) isSameValue(value);
    }
  };
  const handleChange: PropsSameValue = ({ target }) => {
    setInput(target.value);
  };

  return (
    <Form direction="row" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        placeholder={title}
        maxLength={5}
        id={id}
        value={input}
        disabled={active}
        onChange={handleChange}
      />
      {button && (
        <Button
          buttonName="teste"
          onClick={() => handleClick()}
          active={active}
        />
      )}
      {InputError && (
        <DivError>
          O texto digitado nos campos tem de ter no minimo e no maximo 5
          caracteres!
        </DivError>
      )}
    </Form>
  );
};

export default Field;
