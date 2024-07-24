'use client';

import React from 'react';
import { ShareSocial } from 'react-share-social';
import Image from 'next/image';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { FiCopy } from 'react-icons/fi';
import Logo from '../../public/logo.png';

interface ShareProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose?: () => void;
  url: string | undefined;
  isInvite:boolean
}

function Share({ isOpen, onOpenChange, url,isInvite }: ShareProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url || '');
    // You can add a toast notification here to inform the user that the link has been copied
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      className='p-4'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center">
              <div className="flex items-center mb-2">
                <Image src={Logo} alt="BoardSync Logo" className='h-10 w-auto' />
                <h1 className='mx-2 text-3xl font-bold bg-gradient-to-r from-custom-pink to-violet-500 text-transparent bg-clip-text leading-snug'>
                  BoardSync
                </h1>
              </div>
              <p className="text-lg text-gray-600">{isInvite?'Share invitation link':'Share your workspace'}</p>
            </ModalHeader>
            <ModalBody>
              <div className="mb-4">
                <Input
                  label={isInvite?"Invitation Link":"Workspace Link"}
                  value={url}
                  readOnly
                  endContent={
                    <Button isIconOnly variant="light" onClick={handleCopyLink}>
                      <FiCopy className="text-default-400" />
                    </Button>
                  }
                />
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Share on social media</h2>
                <ShareSocial  
                  url={url as string}
                  style={{
                    root: {
                      padding: 0,
                    },
                    copyContainer: {
                      display: 'none', // Hide the default copy container
                    },
                    title: {
                      display: 'none', // Hide the default title
                    },
                    socialContainer: {
                      justifyContent: 'space-around',
                    },
                  }}
                  socialTypes={['facebook', 'twitter', 'linkedin', 'reddit', 'whatsapp', 'telegram']}
                  onSocialButtonClicked={(data) => console.log(data)}    
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default Share;