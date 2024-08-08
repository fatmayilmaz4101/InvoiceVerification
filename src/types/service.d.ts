declare namespace Services {
  type StockIdentification = {
    stok_kodu: string;
    stok_ismi: string;
    birim: string;
    aciklama: string;
    tarih: string;
  };
  type CompanyPriceList = {
    firma_cari_kodu: string,
    firma_cari_adi: string,
    stok_kodu: string,
    stok_ismi: string,
    birim_fiyat: number,
    birim: string,
    doviz_cinsi: string,
    aciklama: string,
    tarih: string,
  };
  type CompanyDefinition = {
    firma_cari_kodu: string,
    firma_cari_adi: string,
    vade: number
    fatura_birimi: string,
    aciklama: string,
    tarih: string,

  }
}
