class ContentSerializer < ActiveModel::Serializer
  attributes :torrent_url, :title, :info_hash

  def torrent_url
    [ 'https://s3.amazonaws.com', ENV["S3_BUCKET"], object.torrent_key ].join('/')
  end
end
