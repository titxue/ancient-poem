import React from 'react';
import { Button, Dropdown } from 'antd';
import { ShareAltOutlined, TwitterOutlined, FacebookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Poem } from '@/types/poem';
import styles from './Share.module.scss';

interface ShareButtonProps {
  poem: Poem;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ poem, className }) => {
  const shareUrl = `${window.location.origin}/poems/${poem.id}`;
  const shareText = `${poem.title} - ${poem.author}`;

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          // You might want to add a toast notification here
          console.log('Link copied to clipboard');
        });
        return;
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const items = [
    {
      key: 'twitter',
      icon: <TwitterOutlined />,
      label: '分享到 Twitter',
      onClick: () => handleShare('twitter')
    },
    {
      key: 'facebook',
      icon: <FacebookOutlined />,
      label: '分享到 Facebook',
      onClick: () => handleShare('facebook')
    },
    {
      key: 'copy',
      icon: <LinkOutlined />,
      label: '复制链接',
      onClick: () => handleShare('copy')
    }
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} className={className}>
      <Button 
        type="text" 
        icon={<ShareAltOutlined />}
        className={styles.shareButton}
        onClick={(e) => e.preventDefault()}
      />
    </Dropdown>
  );
}; 