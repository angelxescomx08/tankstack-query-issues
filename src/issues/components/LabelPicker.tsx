import { LoadingSpinner } from "../../shared";
import { useLabels } from "../hooks";

type Props = {
  onSelectedLabel: (labels: string) => void;
  selectedLabels: string[];
}

export const LabelPicker = ({ selectedLabels, onSelectedLabel }: Props) => {

  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {
        labelsQuery.data?.map((label) => (
          <span
            key={label.id}
            onClick={() => onSelectedLabel(label.name)}
            className={`${selectedLabels.includes(label.name) ? 'selected-label' : ''} animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer`}
            style={{ 
              border: `1px solid #${label.color}`, 
              color: `#${label.color}`, 
              backgroundColor: `#${label.color}1a` 
            }}
          >
            {label.name}
          </span>
        ))
      }
    </div>
  );
};
