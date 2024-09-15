import { useState } from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../interfaces';

export const ListView = () => {

  const [state, setState] = useState<State>(State.All);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const { 
    page, issuesQuery, nextPage, previousPage 
  } = useIssues({ state, selectedLabels });
  const issues = issuesQuery.data ?? [];

  const onLabelSelect = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {
          issuesQuery.isLoading ? (
            <LoadingSpinner />
          ) : <>
            <IssueList 
              state={state} 
              onStateChange={setState}
              issues={issues} 
            />
            <div className='flex justify-between items-center'>
              <button 
                onClick={previousPage}
                className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>
                Anteriores
              </button>

              <span>{page}</span>

              <button 
                onClick={nextPage}
                className='p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all'>
                Siguientes
              </button>
            </div>
          </>
          
        }
        
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker 
          onSelectedLabel={onLabelSelect}
          selectedLabels={selectedLabels}
        />
      </div>
    </div>
  );
};
