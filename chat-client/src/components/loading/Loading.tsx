import { Spinner } from "flowbite-react";

export default function Loading(){
    return (
        <div className="size-full flex items-center justify-center">
            <Spinner aria-label="Loading indicator"/>
        </div>
    )
}