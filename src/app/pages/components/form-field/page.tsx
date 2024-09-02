import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { SelectItemOptionsType } from "primereact/selectitem";
import { Controller } from "react-hook-form";
type FormFieldType = {
  control: any;
  name: string;
  label: string;
  required?: string;
  type: "dropdown" | "text" | "number" | "dropdown" | "autocomplete";
  options?: SelectItemOptionsType | undefined;
  onChangeComplete?: (event: AutoCompleteChangeEvent) => void;
  suggestions?: any[] | undefined;
  completeMethod?(event: AutoCompleteCompleteEvent): void;
  disabled?: boolean;
};

export const FormField = ({
  control,
  required,
  type,
  name,
  label,
  options,
  onChangeComplete,
  suggestions,
  completeMethod,
  disabled = false,
}: FormFieldType) => {
  return (
    <>
      <Controller
        control={control}
        rules={{
          required: required,
        }}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <div className="field col-12 mb-1">
            <span className="p-float-label">
              <FloatLabel>
                {type === "text" ? (
                  <InputText
                    onBlur={onBlur}
                    disabled={disabled}
                    onChange={onChange}
                    value={value}
                    {...(error && {
                      tooltip: error.message,
                      tooltipOptions: {
                        position: "top",
                        className: "p-error",
                      },
                    })}
                    className={error ? "p-invalid" : ""}
                  />
                ) : type === "number" ? (
                  <InputNumber
                    onBlur={onBlur}
                    disabled={disabled}
                    onChange={(e) => {
                      onChange(e.value);
                      console.log(e.value);
                    }}
                    value={value}
                    id={name}
                    {...(error && {
                      tooltip: error.message,
                      tooltipOptions: {
                        position: "top",
                        className: "p-error",
                      },
                    })}
                    className={error ? "p-invalid" : ""}
                  />
                ) : type === "dropdown" ? (
                  <Dropdown
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                    {...(error && {
                      tooltip: error.message,
                      tooltipOptions: {
                        position: "top",
                        className: "p-error",
                      },
                    })}
                    className={error ? "p-invalid" : ""}
                    checkmark={true}
                    highlightOnSelect={false}
                    optionLabel="label"
                    options={options}
                  />
                ) : (
                  <AutoComplete
                    id="autocomplete"
                    onBlur={onBlur}
                    disabled={disabled}
                    value={value}
                    onChange={(e) => {
                      onChange(e.value);
                      onChangeComplete?.(e);
                    }}
                    suggestions={suggestions}
                    completeMethod={completeMethod}
                    field={name}
                    {...(error && {
                      tooltip: error.message,
                      tooltipOptions: {
                        position: "top",
                        className: "p-error",
                      },
                    })}
                    className={error ? "p-invalid" : ""}
                  />
                )}
                <label htmlFor={name}>{label}</label>
              </FloatLabel>
            </span>
          </div>
        )}
        name={name}
      />
    </>
  );
};
