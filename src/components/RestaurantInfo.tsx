import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import { RestaurantConfig } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface RestaurantInfoProps {
    restaurant?: RestaurantConfig | null;
    isMobile?: boolean;
}

export const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant, isMobile = false }) => {
    const { primaryColor, titleColor, descriptionColor, borderLogo } = useTheme();

    return (
        <div className="flex flex-col items-center text-center w-full">
            <div className={`relative z-20 ${isMobile ? '-mt-12 mb-4' : 'mb-6'}`}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`rounded-full overflow-hidden bg-zinc-900 shadow-2xl ${isMobile ? 'w-24 h-24 border-2' : 'w-24 h-24 lg:w-32 lg:h-32 border-2 lg:mx-auto'}`}
                    style={{ borderColor: borderLogo ? primaryColor : 'transparent' }}
                >
                    {restaurant?.logoUrl && <img src={restaurant.logoUrl} alt={restaurant.name} className="w-full h-full object-cover" />}
                </motion.div>
            </div>

            <h1 className="font-bold tracking-tight mb-2 text-2xl lg:text-4xl" style={{ color: titleColor }}>
                {restaurant?.name}
            </h1>

            <p className="text-sm opacity-70 leading-relaxed max-w-[280px] lg:max-w-md mx-auto" style={{ color: descriptionColor }}>
                {restaurant?.description}
            </p>

            {(restaurant?.address || restaurant?.phone) && (
                <div
                    className="flex flex-col gap-y-2 mt-4 mb-2 opacity-60 items-center text-center"
                    style={{ color: descriptionColor }}
                >
                    {restaurant?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={11} style={{ color: primaryColor }} />
                            <span className="text-[11px] tracking-wide font-medium">{restaurant.phone}</span>
                        </div>
                    )}

                    {restaurant?.address && (
                        <div className="flex items-start gap-2 max-w-[240px]">
                            <MapPin size={11} className="mt-0.5 shrink-0" style={{ color: primaryColor }} />
                            <span className="text-[11px] leading-tight font-medium">{restaurant.address}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
