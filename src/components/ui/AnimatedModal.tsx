'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import React, { ReactNode, useEffect, useRef } from 'react'

import { useModal } from '@/hooks/useModal'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import { ModalProvider } from '@/app/providers'
import { cn } from '@/lib/utils'

export function Modal({ children }: { children: ReactNode }) {
	return <ModalProvider>{children}</ModalProvider>
}

export const ModalTrigger = ({
	children,
	className
}: {
	children: ReactNode
	className?: string
}) => {
	const { setOpen } = useModal()
	return (
		<button
			className={cn(
				'rounded-md text-black dark:text-white text-center relative overflow-hidden',
				className
			)}
			onClick={() => setOpen(true)}
		>
			{children}
		</button>
	)
}

export const ModalBody = ({
	children,
	className
}: {
	children: ReactNode
	className?: string
}) => {
	const { open } = useModal()

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto'
		}
	}, [open])

	const modalRef = useRef(null)
	const { setOpen } = useModal()
	useOutsideClick(modalRef, () => setOpen(false))

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{
						opacity: 0
					}}
					animate={{
						opacity: 1,
						backdropFilter: 'blur(10px)'
					}}
					exit={{
						opacity: 0,
						backdropFilter: 'blur(0px)'
					}}
					className='fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50'
				>
					<Overlay />

					<motion.div
						ref={modalRef}
						className={cn(
							'min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-primary border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden',
							className
						)}
						initial={{
							opacity: 0,
							scale: 0.5,
							rotateX: 40,
							y: 40
						}}
						animate={{
							opacity: 1,
							scale: 1,
							rotateX: 0,
							y: 0
						}}
						exit={{
							opacity: 0,
							scale: 0.8,
							rotateX: 10
						}}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 15
						}}
					>
						<CloseIcon />
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export const ModalContent = ({
	children,
	className
}: {
	children: ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn(
				'flex flex-col flex-1 p-8 overflow-y-auto max-h-[80vh] md:p-10',
				className
			)}
		>
			{children}
		</div>
	)
}

export const ModalFooter = ({
	children,
	className
}: {
	children: ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn(
				'flex justify-end p-4 bg-gray-100 dark:bg-neutral-900',
				className
			)}
		>
			{children}
		</div>
	)
}

const Overlay = ({ className }: { className?: string }) => {
	return (
		<motion.div
			initial={{
				opacity: 0
			}}
			animate={{
				opacity: 1,
				backdropFilter: 'blur(10px)'
			}}
			exit={{
				opacity: 0,
				backdropFilter: 'blur(0px)'
			}}
			className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
		></motion.div>
	)
}

const CloseIcon = () => {
	const { setOpen } = useModal()
	return (
		<button
			onClick={() => setOpen(false)}
			className='absolute top-4 right-4 group'
		>
			<X size={24} />
		</button>
	)
}
