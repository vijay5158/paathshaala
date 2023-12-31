import React from 'react';
import Chip from "@mui/material/Chip";

const AssignmentCard = ({data}) => {
    return (
        <div className=" w-full flex hover:shadow-md shadow-lg rounded-lg overflow-hidden">
        <div className="h-38 w-1/3 lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-[url('https://source.unsplash.com/random/?art,abstract,architecture,interior,3d,aesthetic,modern')]" title={data?.title}>
        </div>
        <div className="w-2/3 rounded-lg border-r border-b border-t border-gray-200 lg:border-l-0 lg:border-t lg:border-gray-200 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="w-full flex justify-between items-center">
            <p className="text-sm text-gray-600 flex items-center">
              <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Students only
            </p>
            {new Date(data?.end_date) < new Date() ?
            <Chip color={"error"} size="small" label={"Expired"} />
            :
            <Chip color={"success"} size="small" label={"Active"} />
            }
            </div>
            <div className="text-gray-900 font-bold text-lg mb-2 text-start">{data?.title}</div>
          </div>
          <div className="flex items-center">
            <div className="">
              <p className="text-sm text-gray-900 leading-none text-start">{data?.creator || "Teacher Name"}</p>
              <p className="text-xs mt-2 text-gray-600 text-start">{new Date(data?.created_at)?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AssignmentCard;