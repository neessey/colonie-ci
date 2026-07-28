// components/CartDrawer.tsx (version simplifiée sans erreurs)
"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, getTotalPriceFormatted, getTotalItems } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPriceFormatted();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark-900/80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-dark-100 shadow-xl border-l border-cream-100/10">
                    <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-cream-100/10">
                      <Dialog.Title className="text-lg font-serif text-cream-100">
                        Mon panier ({totalItems})
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-md text-cream-200/60 hover:text-cream-100"
                        onClick={onClose}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      {items.length === 0 ? (
                        <div className="text-center py-12">
                          <p className="text-cream-200/60">Votre panier est vide</p>
                          <button
                            onClick={onClose}
                            className="mt-4 text-honey hover:text-honey-light"
                          >
                            Continuer mes achats
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {items.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-cream-100/10 pb-6">
                              <div className="h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-dark-50">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex flex-1 flex-col">
                                <div className="flex justify-between">
                                  <h4 className="text-sm font-medium text-cream-100">{item.name}</h4>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-cream-200/40 hover:text-red-500"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </button>
                                </div>
                                <p className="mt-1 text-sm text-cream-200/60">{item.weight}</p>
                                <div className="mt-2 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="w-7 h-7 rounded-full border border-cream-100/20 text-cream-100 hover:border-honey hover:text-honey"
                                    >
                                      -
                                    </button>
                                    <span className="text-cream-100 w-8 text-center">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="w-7 h-7 rounded-full border border-cream-100/20 text-cream-100 hover:border-honey hover:text-honey"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <p className="text-honey font-medium">
                                    {(item.price * item.quantity).toLocaleString()} FCFA
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {items.length > 0 && (
                      <div className="border-t border-cream-100/10 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-cream-100 mb-4">
                          <p>Total</p>
                          <p className="text-honey">{totalPrice}</p>
                        </div>
                        <Link
                          href="/checkout"
                          onClick={onClose}
                          className="flex w-full justify-center rounded-full bg-honey px-6 py-3 text-dark font-medium hover:bg-honey-light transition-colors"
                        >
                          Commander
                        </Link>
                        <button
                          onClick={onClose}
                          className="mt-3 flex w-full justify-center rounded-full border border-honey/30 px-6 py-3 text-honey text-sm"
                        >
                          Continuer mes achats
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}