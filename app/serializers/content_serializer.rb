class ContentSerializer < ActiveModel::Serializer
  attributes :id, :torrent_url, :title

  def torrent_url
    [ 'https://s3.amazonaws.com', ENV["S3_BUCKET"], object.torrent_key ].join('/')
  end
end
