'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { trackSectorClick } from '@/lib/sector-tracking';
import { Skeleton } from '@/components/ui/skeleton';
import type { CandidatesSectorOverviewResponse, CandidatesSectorOverviewItem } from '@/types/api';
import {
  Code,
  Heart,
  Calculator,
  Megaphone,
  TrendingUp,
  HardHat,
  Car,
  UtensilsCrossed,
  Building2,
  Users,
  Truck,
  Palette,
  Headphones,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  code: Code,
  heart: Heart,
  calculator: Calculator,
  megaphone: Megaphone,
  'trending-up': TrendingUp,
  hardhat: HardHat,
  car: Car,
  utensils: UtensilsCrossed,
  building: Building2,
  users: Users,
  truck: Truck,
  palette: Palette,
  headphones: Headphones,
  briefcase: Briefcase,
};

function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName.toLowerCase()] || Briefcase;
}

export function CandidatesSectorsGrid() {
  const { user } = useAuth();
  const [sectors, setSectors] = useState<CandidatesSectorOverviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectors = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get<CandidatesSectorOverviewResponse>('/homepage/candidates-sectors-overview');
        setSectors(res.items);
      } catch (err) {
        setError('Sectoren konden niet geladen worden.');
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  const handleSectorClick = (sectorId: string) => {
    trackSectorClick(sectorId, !!user);
  };

  // Loading state - 13 skeleton cards
  if (loading) {
    return (
      <section className="medium-padding120">
        <div className="container">
          <div className="row mb60">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
                <h2 className="heading-title">Vind kandidaten per specialisme</h2>
                <div className="heading-text">
                  Ontdek talent dat past bij jouw vacatures. Jobhulp matcht je automatisch met kandidaten die de vaardigheden en ervaring hebben die jij zoekt.
                </div>
              </header>
            </div>
          </div>

          <div className="row sorting-container mb20">
            {Array.from({ length: 13 }).map((_, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb40 sorting-item">
                <div className="crumina-module crumina-info-box info-box--squared">
                  <div className="info-box-thumb">
                    <Skeleton className="h-[60px] w-[60px] rounded-lg mb-3" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <div className="info-box-content">
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || sectors.length === 0) {
    return (
      <section className="medium-padding120">
        <div className="container">
          <div className="row mb60">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
                <h2 className="heading-title">Vind kandidaten per specialisme</h2>
              </header>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p className="text-muted">{error || 'Sectoren konden niet geladen worden.'}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="medium-padding120">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
              <h2 className="heading-title">Vind kandidaten per specialisme</h2>
              <div className="heading-text">
                Ontdek talent dat past bij jouw vacatures. Jobhulp matcht je automatisch met kandidaten die de vaardigheden en ervaring hebben die jij zoekt.
              </div>
            </header>
          </div>
        </div>

        <div className="row sorting-container mb20" data-layout="fitRows" id="candidates-category-grid">
          {sectors.map((sector) => {
            const IconComponent = getIconComponent(sector.icon);

            return (
              <div key={sector.id} className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb40 sorting-item">
                <Link
                  href={`/candidates/${sector.homepageSlug}`}
                  onClick={() => handleSectorClick(sector.id)}
                  className="crumina-module crumina-info-box info-box--squared block hover:shadow-lg transition-shadow duration-200"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div className="info-box-thumb">
                    <IconComponent 
                      className="mb-3" 
                      style={{ 
                        width: 60, 
                        height: 60, 
                        color: sector.color || '#6366f1' 
                      }} 
                    />
                    <span className="h5 info-box-title">{sector.name}</span>
                  </div>
                  <div className="info-box-content">
                    <span className="info-box-link text-muted">
                      {sector.candidatesCount} kandidaten beschikbaar
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CandidatesSectorsGrid;
