import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({
  handleDeleteComments,
  showDelete,
  setShowDelete,
  handleDelete,
}) {
  return (
    <>
      <Transition appear show={showDelete} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowDelete}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className=" fixed inset-0 overflow-y-auto">
            <div className="flex  min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-full max-w-sm max-h-96 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="  text-lg font-medium leading-6 text-gray-900 my-4"
                  >
                    Delete comment
                  </Dialog.Title>
                  <div className="mt-2 mx-2 px-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this comment? This will
                      remove the comment and can't be undone.
                    </p>
                  </div>
                  <div className="flex justify-around align-center mt-4">
                    <div className=" mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={setShowDelete}
                      >
                        No, Cancel
                      </button>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleDeleteComments}
                      >
                        Yes, Delete
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
